import contextlib
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / "scripts/video-intake.py"
spec = importlib.util.spec_from_file_location("video_intake", SCRIPT)
intake = importlib.util.module_from_spec(spec)
spec.loader.exec_module(intake)


class IntakeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / "productions"
        self.root.mkdir()
        self.items = [self.make_work(provider) for provider in ("topview", "domoai", "pollo")]

    def make_work(self, provider, folder=None):
        folder = folder or ("TopviewAI" if provider == "topview" else provider)
        source = self.root / folder / f"{provider}.mp4"
        source.parent.mkdir(parents=True, exist_ok=True)
        source.write_bytes(provider.encode())
        record = source.with_suffix(".md")
        record.write_text("Recorded source", encoding="utf-8")
        return {"id": provider, "title": provider, "platform": provider,
                "sourceFile": source.relative_to(self.root).as_posix(),
                "provenance": record.relative_to(self.root).as_posix(),
                "approvedSha256": hashlib.sha256(source.read_bytes()).hexdigest()}

    def inspect(self, selected=None, approved=None):
        return intake.inspect_intake(selected if selected is not None else self.items,
                                     approved if approved is not None else self.items,
                                     self.root, ["topview", "domoai", "pollo"])

    def test_three_examples_are_actual_hash_bound_sources(self):
        report = self.inspect()
        self.assertEqual(report["status"], "PASS")
        self.assertEqual([row["platform"] for row in report["examples"]], ["topview", "domoai", "pollo"])
        for example in report["examples"]:
            self.assertTrue(Path(example["provenance"]).is_file())
            self.assertEqual(example["sha256"], hashlib.sha256(Path(example["sourceFile"]).read_bytes()).hexdigest())

    def test_channel_corpus_cannot_be_relabelled_as_provider_work(self):
        channels = [self.make_work(provider, "upload-shelf") for provider in ("topview", "domoai", "pollo")]
        report = self.inspect(channels, channels)
        self.assertEqual(report["status"], "BLOCKED")
        self.assertEqual(report["verifiedCount"], 0)
        self.assertTrue(all("WRONG_CORPUS" in row["codes"] for row in report["errors"] if "codes" in row))

    def test_missing_pollo_is_explicit_not_success_with_two_examples(self):
        report = self.inspect(self.items[:2])
        self.assertEqual(report["status"], "BLOCKED")
        self.assertEqual(report["missingProviders"], ["pollo"])

    def test_forged_provider_cannot_supply_missing_category(self):
        forged = [dict(item) for item in self.items[:2]]
        forged[0]["platform"] = "pollo"
        report = self.inspect(forged)
        self.assertEqual(report["status"], "BLOCKED")
        self.assertIn("pollo", report["missingProviders"])
        self.assertIn("UNCONFIRMED_SELECTION", report["errors"][0]["codes"])

    def test_changed_bytes_do_not_keep_approval(self):
        (self.root / self.items[2]["sourceFile"]).write_bytes(b"different cut")
        report = self.inspect()
        self.assertEqual(report["status"], "BLOCKED")
        self.assertIn("STALE_SOURCE_APPROVAL", report["errors"][0]["codes"])

    def test_approved_own_x_archive_metadata_is_not_guessed_from_folder(self):
        archive = self.make_work("topview", "own-x/pollo")
        selection = [archive, *self.items[1:]]
        self.assertEqual(self.inspect(selection, selection)["status"], "PASS")

    def test_source_escape_is_rejected(self):
        forged = [dict(item) for item in self.items]
        forged[0]["sourceFile"] = "../outside.mp4"
        report = self.inspect(forged, forged)
        self.assertIn("INVALID_SOURCE", report["errors"][0]["codes"])

    def test_missing_provider_never_launches_importer(self):
        selection = Path(self.temp.name) / "selection.json"
        selection.write_text(json.dumps(self.items[:2]), encoding="utf-8")
        with patch.object(intake, "SELECTION", selection), patch.object(intake, "SOURCE", self.root), patch.object(intake.subprocess, "run") as run, contextlib.redirect_stdout(io.StringIO()):
            result = intake.main(["--require-providers", "topview", "domoai", "pollo", "--sync"])
        self.assertEqual(result, 2)
        run.assert_not_called()

    def test_valid_wrapper_launches_only_existing_local_importer_and_preserves_exit(self):
        selection = Path(self.temp.name) / "selection.json"
        selection.write_text(json.dumps(self.items), encoding="utf-8")
        with patch.object(intake, "SELECTION", selection), patch.object(intake, "SOURCE", self.root), patch.object(intake.subprocess, "run") as run, contextlib.redirect_stdout(io.StringIO()):
            run.return_value.returncode = 7
            result = intake.main(["--require-providers", "topview", "domoai", "pollo", "--sync", "--copy-media"])
        self.assertEqual(result, 7)
        self.assertEqual(Path(run.call_args.args[0][3]).name, "sync-videos.py")
        self.assertIn("--copy-media", run.call_args.args[0])


if __name__ == "__main__":
    unittest.main()
