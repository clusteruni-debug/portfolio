"""Create smaller web copies of approved final cuts without changing their sources."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PROFILE = "h264-crf21-slow-v1"
MIN_SSIM = 0.98


def digest_file(path):
    with path.open("rb") as handle:
        return hashlib.file_digest(handle, "sha256").hexdigest()


def probe(path):
    data = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-count_packets", "-show_entries",
        "format=duration:stream=codec_type,codec_name,width,height,nb_read_packets,avg_frame_rate,pix_fmt,color_transfer,color_range",
        "-of", "json", str(path)], encoding="utf-8"))
    video = next(s for s in data["streams"] if s["codec_type"] == "video")
    return {**video, "duration": float(data["format"]["duration"]),
            "audio": [s for s in data["streams"] if s["codec_type"] == "audio"]}


def audio_hash(path):
    return subprocess.check_output([
        "ffmpeg", "-v", "error", "-i", str(path), "-map", "0:a:0",
        "-c", "copy", "-f", "hash", "-hash", "sha256", "-"], encoding="utf-8").strip()


def verify_timing(source, encoded):
    def timestamps(filename, stream):
        data = json.loads(subprocess.check_output([
            "ffprobe", "-v", "error", "-select_streams", stream, "-show_packets",
            "-show_entries", "packet=pts_time", "-of", "json", str(filename)], encoding="utf-8"))
        return sorted(float(packet["pts_time"]) for packet in data["packets"])
    for stream in ("v:0", "a:0"):
        before, after = timestamps(source, stream), timestamps(encoded, stream)
        if len(before) != len(after) or any(abs(a-b) > .001 for a, b in zip(before, after)):
            raise ValueError(f"Changed frame/audio timing: {encoded.name} ({stream})")


def assert_approved(video, selection, source):
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", video["id"]):
        raise ValueError("Invalid work ID")
    if selection.get("sourceFile") != video["sourceFile"]:
        raise ValueError(f"Selection differs: {video['id']}")
    digest = digest_file(source)
    if digest != video["sha256"] or digest != selection.get("approvedSha256"):
        raise ValueError(f"Unapproved or changed source: {video['id']}")
    if source.stat().st_size != video["bytes"]:
        raise ValueError(f"Source size differs: {video['id']}")


def should_use(original_bytes, encoded_bytes, similarity):
    # Avoid generational loss where the source is already compact.
    return encoded_bytes < original_bytes * 0.90 and similarity >= MIN_SSIM


def assert_storage_capacity(videos, storage):
    if storage.get("provider") == "workers-static":
        oversized = [v["id"] for v in videos if v.get("webDelivery", v)["bytes"] >= 25 * 1024 * 1024]
        if oversized:
            raise ValueError(f"Workers copy must stay below 25 MiB; retain or tune the verified copy: {', '.join(oversized)}")


def can_encode(media):
    return (len(media["audio"]) <= 1 and media["pix_fmt"] == "yuv420p"
            and media.get("color_range") != "pc"
            and media.get("color_transfer") not in {"smpte2084", "arib-std-b67"})


def compare(source, encoded, log):
    original, candidate = probe(source), probe(encoded)
    for field in ("width", "height", "nb_read_packets"):
        if original[field] != candidate[field]:
            raise ValueError(f"Changed {field}: {encoded.name}")
    if abs(original["duration"] - candidate["duration"]) > 0.05:
        raise ValueError(f"Changed duration: {encoded.name}")
    if len(original["audio"]) != len(candidate["audio"]):
        raise ValueError(f"Changed audio track count: {encoded.name}")
    if original["audio"] and audio_hash(source) != audio_hash(encoded):
        raise ValueError(f"Changed encoded audio payload: {encoded.name}")
    result = subprocess.run([
        "ffmpeg", "-hide_banner", "-i", str(source), "-i", str(encoded),
        "-filter_complex", "[0:v]settb=AVTB,setpts=PTS-STARTPTS[a];[1:v]settb=AVTB,setpts=PTS-STARTPTS[b];[a][b]ssim",
        "-an", "-f", "null", "-"], capture_output=True, text=True, check=True)
    log.write_text(result.stderr, encoding="utf-8")
    match = re.search(r"All:([0-9.]+)", result.stderr)
    if not match:
        raise ValueError("Missing full-video SSIM result")
    return float(match.group(1)), candidate


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ids", nargs="+", help="Limit a local comparison to named works")
    parser.add_argument("--apply", action="store_true", help="Select verified smaller copies in the catalog")
    args = parser.parse_args()
    catalog_path = ROOT / "src/data/videos.json"
    videos = json.loads(catalog_path.read_text(encoding="utf-8"))
    selected = json.loads((ROOT / "src/data/video-selection.json").read_text(encoding="utf-8"))
    selection = {v["id"]: v for v in selected}
    if len(selection) != len(selected) or len({v['id'] for v in videos}) != len(videos):
        raise ValueError("Duplicate work IDs")
    if set(selection) != {v["id"] for v in videos}:
        raise ValueError("Catalog must match the explicit selection")
    if args.ids and not set(args.ids).issubset(selection):
        raise ValueError("Unknown selected work ID")
    batch = [v for v in videos if not args.ids or v["id"] in args.ids]
    for video in batch:
        assert_approved(video, selection[video["id"]], ROOT / "public/videos/media" / f"{video['id']}.mp4")
    evidence = ROOT / "tmp/video-optimization"
    evidence.mkdir(parents=True, exist_ok=True)
    report = []
    for video in batch:
        source = ROOT / "public/videos/media" / f"{video['id']}.mp4"
        original = probe(source)
        if not can_encode(original):
            report.append({"id": video["id"], "sourceBytes": video["bytes"], "deliveryBytes": video["bytes"],
                           "useCompressed": False, "reason": "Preserve source color format or audio tracks"})
            print(f"Keeping original color/audio format: {video['id']}", flush=True)
            if args.apply:
                video.pop("webDelivery", None)
                if video.get("publishedSha256") != video["sha256"]:
                    video["playbackUrl"], video["publishedSha256"] = "", ""
            continue
        output_dir = ROOT / "tmp/video-delivery" / video["id"]
        output_dir.mkdir(parents=True, exist_ok=True)
        encoded = output_dir / f"{video['sha256']}-crf21.mp4"
        proof = evidence / f"{video['id']}.json"
        cached = json.loads(proof.read_text(encoding="utf-8")) if proof.exists() else {}
        if not (encoded.exists() and cached.get("sourceSha256") == video["sha256"]
                and cached.get("profile") == PROFILE and cached.get("sha256") == digest_file(encoded)):
            print(f"Encoding: {video['id']}", flush=True)
            # Do not scale, trim, retime or re-encode audio. Never overwrite a source.
            subprocess.run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                "-map", "0:v:0", "-map", "0:a?", "-c:v", "libx264", "-preset", "slow",
                "-crf", "21", "-threads", "6", "-pix_fmt", "yuv420p", "-fps_mode", "passthrough",
                "-c:a", "copy", "-movflags", "+faststart", str(encoded)], check=True)
            similarity, media = compare(source, encoded, evidence / f"{video['id']}-ssim.log")
            cached = {"id": video["id"], "sourceSha256": video["sha256"],
                      "sha256": digest_file(encoded), "bytes": encoded.stat().st_size,
                      "sourceBytes": video["bytes"], "profile": PROFILE, "ssim": similarity,
                      "width": media["width"], "height": media["height"],
                      "frames": int(media["nb_read_packets"]), "audioCopied": True}
            proof.write_text(json.dumps(cached, indent=2) + "\n", encoding="utf-8")
        verify_timing(source, encoded)
        cached["timingVerified"] = True
        proof.write_text(json.dumps(cached, indent=2) + "\n", encoding="utf-8")
        use = should_use(video["bytes"], cached["bytes"], cached["ssim"])
        report.append({**cached, "useCompressed": use, "deliveryBytes": cached["bytes"] if use else video["bytes"]})
        print(json.dumps({"id": video["id"], "originalMB": round(video["bytes"]/1e6, 2),
                          "compressedMB": round(cached["bytes"]/1e6, 2), "ssim": cached["ssim"], "selected": use}), flush=True)
        if args.apply and use:
            video["webDelivery"] = {key: cached[key] for key in
                                    ("sourceSha256", "sha256", "bytes", "profile", "width", "height", "frames", "ssim")}
            if video.get("publishedSha256") != cached["sha256"]:
                video["playbackUrl"], video["publishedSha256"] = "", ""
        elif args.apply:
            video.pop("webDelivery", None)
            if video.get("publishedSha256") != video["sha256"]:
                video["playbackUrl"], video["publishedSha256"] = "", ""
    summary = {"profile": PROFILE, "originalBytes": sum(v["sourceBytes"] for v in report),
               "deliveryBytes": sum(v["deliveryBytes"] for v in report), "works": report}
    (evidence / ("sample-report.json" if args.ids else "report.json")).write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    if args.apply:
        # Atomic batch update, only after every selected file passed validation.
        storage_path = ROOT / "src/data/video-storage.json"
        if storage_path.exists():
            assert_storage_capacity(videos, json.loads(storage_path.read_text(encoding="utf-8")))
        temporary = catalog_path.with_suffix(".json.tmp")
        temporary.write_text(json.dumps(videos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        temporary.replace(catalog_path)
    print(json.dumps({k: summary[k] for k in ("originalBytes", "deliveryBytes", "profile")}))


if __name__ == "__main__":
    main()
