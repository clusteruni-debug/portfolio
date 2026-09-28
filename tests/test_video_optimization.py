import importlib.util
from pathlib import Path
import tempfile
import unittest

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"


def load(name):
    spec = importlib.util.spec_from_file_location(name, SCRIPTS / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


optimize = load("optimize-videos")
sync = load("sync-videos")


class VideoOptimizationTests(unittest.TestCase):
    def test_workers_rejects_reintroducing_an_oversized_copy_before_catalog_write(self):
        storage = {"provider": "workers-static"}
        original = {"id": "film", "bytes": 40 * 1024 * 1024}
        optimize.assert_storage_capacity([{**original, "webDelivery": {"bytes": 25 * 1024 * 1024 - 1}}], storage)
        for video in [original, {**original, "webDelivery": {"bytes": 25 * 1024 * 1024}}]:
            with self.assertRaisesRegex(ValueError, "below 25 MiB"):
                optimize.assert_storage_capacity([video], storage)
        optimize.assert_storage_capacity([original], {"provider": "vercel-blob"})

    def test_preserves_hdr_full_range_and_multiple_audio_track_sources(self):
        media = {"audio": [{}], "pix_fmt": "yuv420p"}
        self.assertTrue(optimize.can_encode(media))
        for patch in ({"pix_fmt": "yuvj420p"}, {"color_range": "pc"},
                      {"color_transfer": "smpte2084"}, {"audio": [{}, {}]}):
            self.assertFalse(optimize.can_encode({**media, **patch}))

    def test_changed_source_cannot_be_optimized_as_an_approved_final(self):
        with tempfile.TemporaryDirectory() as folder:
            source = Path(folder) / "final.mp4"
            source.write_bytes(b"accepted final")
            digest = optimize.digest_file(source)
            video = {"id": "film", "sourceFile": "a/final.mp4", "sha256": digest, "bytes": source.stat().st_size}
            selection = {"sourceFile": video["sourceFile"], "approvedSha256": digest}
            optimize.assert_approved(video, selection, source)
            source.write_bytes(b"different take")
            with self.assertRaisesRegex(ValueError, "Unapproved or changed"):
                optimize.assert_approved(video, selection, source)

    def test_low_savings_or_poor_similarity_keeps_original(self):
        self.assertTrue(optimize.should_use(1000, 400, .99))
        self.assertFalse(optimize.should_use(1000, 950, .99))
        self.assertFalse(optimize.should_use(1000, 400, .97))
        self.assertFalse(optimize.should_use(1000, 1100, 1.0))

    def test_refresh_preserves_verified_derivative_for_same_final(self):
        previous = {"sha256": "a" * 64, "publishedSha256": "b" * 64, "playbackUrl": "https://example/film.mp4",
                    "webDelivery": {"sourceSha256": "a" * 64, "sha256": "b" * 64}}
        self.assertEqual(sync.approved_playback(previous, "a" * 64), (previous["playbackUrl"], "b" * 64))
        self.assertEqual(sync.preserved_delivery(previous, "a" * 64), {"webDelivery": previous["webDelivery"]})
        self.assertEqual(sync.approved_playback(previous, "c" * 64), ("", ""))
        self.assertEqual(sync.preserved_delivery(previous, "c" * 64), {})

    def test_stale_derivative_cannot_preserve_playback(self):
        previous = {"sha256": "a" * 64, "publishedSha256": "b" * 64, "playbackUrl": "https://example/stale.mp4",
                    "webDelivery": {"sourceSha256": "c" * 64, "sha256": "b" * 64}}
        self.assertEqual(sync.approved_playback(previous, "a" * 64), ("", ""))
        self.assertEqual(sync.preserved_delivery(previous, "a" * 64), {})


if __name__ == "__main__":
    unittest.main()
