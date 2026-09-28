"""Import the explicitly selected prompt-generated portfolio works; preserve sources."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PLATFORMS = {"topview", "domoai", "pollo", "newtake", "flow"}


def approved_playback(previous, digest):
    """A new final cut must never keep a URL that serves the previous bytes."""
    delivery = preserved_delivery(previous, digest).get("webDelivery", {})
    published_digest = delivery.get("sha256", digest)
    if previous.get("sha256") == digest and previous.get("publishedSha256") == published_digest:
        return previous.get("playbackUrl", ""), published_digest
    return "", ""


def preserved_delivery(previous, digest):
    delivery = previous.get("webDelivery")
    if previous.get("sha256") == digest and delivery and delivery.get("sourceSha256") == digest:
        return {"webDelivery": delivery}
    return {}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path("C:/vibe/projects/ai-video-hustle/productions"))
    parser.add_argument("--copy-media", action="store_true")
    args = parser.parse_args()
    source_root = args.source.resolve()
    selection = json.loads((ROOT / "src/data/video-selection.json").read_text(encoding="utf-8"))
    catalog = ROOT / "src/data/videos.json"
    existing = {v["id"]: v for v in json.loads(catalog.read_text(encoding="utf-8"))} if catalog.exists() else {}
    if len({v["id"] for v in selection}) != len(selection):
        raise ValueError("Duplicate selected work IDs")
    # Validate every explicitly approved source before changing any output.
    digests = {}
    for item in selection:
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", item["id"]) or item["platform"] not in PLATFORMS:
            raise ValueError(f"Invalid work metadata: {item['id']}")
        source = (source_root / item["sourceFile"]).resolve()
        if not source.is_relative_to(source_root) or source.suffix.lower() != ".mp4" or not source.is_file():
            raise ValueError(f"Missing or invalid source: {item['sourceFile']}")
        evidence = (source_root / item["provenance"]).resolve()
        if not evidence.is_relative_to(source_root.parent) or not evidence.is_file():
            raise ValueError(f"Missing provenance: {item['id']}")
        with source.open("rb") as handle:
            digest = hashlib.file_digest(handle, "sha256").hexdigest()
        if item.get("approvedSha256") != digest:
            raise ValueError(f"Final-file approval is missing or stale: {item['id']}")
        digests[item["id"]] = digest
    posters = ROOT / "public/videos/posters"
    media = ROOT / "public/videos/media"
    posters.mkdir(parents=True, exist_ok=True)
    if args.copy_media:
        media.mkdir(parents=True, exist_ok=True)
    records = []
    for item in selection:
        source = source_root / item["sourceFile"]
        probe = json.loads(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height", "-of", "json", str(source)], encoding="utf-8"))
        stream = next(s for s in probe["streams"] if s["codec_type"] == "video")
        digest = digests[item["id"]]
        old = existing.get(item["id"], {})
        playback_url, published_digest = approved_playback(old, digest)
        poster = posters / f"{item['id']}.webp"
        if not poster.exists() or old.get("sha256") != digest or old.get("posterAt") != item["posterAt"]:
            at = min(item["posterAt"], max(0, float(probe["format"]["duration"]) - .2))
            subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", str(at), "-i", str(source), "-frames:v", "1", "-vf", "scale=960:-2", "-quality", "85", str(poster)], check=True)
        destination = media / f"{item['id']}.mp4"
        if args.copy_media and (not destination.exists() or old.get("sha256") != digest):
            shutil.copy2(source, destination)
        public = {key: item[key] for key in ("id", "title", "platform", "date", "description", "postUrl", "credits")}
        records.append({**public, "isExperiment": item.get("isExperiment", False), "duration": round(float(probe["format"]["duration"]), 2), "width": stream["width"], "height": stream["height"],
            "poster": f"/videos/posters/{item['id']}.webp", "posterAt": item["posterAt"], "playbackUrl": playback_url, "publishedSha256": published_digest,
            "sourceFile": item["sourceFile"], "bytes": source.stat().st_size, "sha256": digest,
            **preserved_delivery(old, digest)})
    if len({v["sha256"] for v in records}) != len(records):
        raise ValueError("Duplicate media; select one representative per work")
    records.sort(key=lambda v: (v["date"], v["id"]), reverse=True)
    catalog.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"works": len(records), "bytes": sum(v["bytes"] for v in records), "copiedMedia": args.copy_media}))


if __name__ == "__main__":
    main()
