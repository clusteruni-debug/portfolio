"""Check the requested prompt-video corpus before the existing local importer runs."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("C:/vibe/projects/ai-video-hustle/productions")
SELECTION = ROOT / "src/data/video-selection.json"
PROVIDERS = {"topview", "domoai", "pollo", "newtake", "flow"}
DIRECT_FOLDERS = {"topviewai": "topview", "domoai": "domoai", "pollo": "pollo", "newtake": "newtake", "flow": "flow"}
BINDING_FIELDS = ("platform", "sourceFile", "provenance", "approvedSha256")


def inspect_intake(selection, approved, source_root, required):
    """Read-only check; approved is the existing explicit selection, not a scan."""
    source_root = Path(source_root).resolve()
    required = list(dict.fromkeys(required))
    errors = []
    valid = []
    known = {item.get("id"): item for item in approved if isinstance(item, dict) and isinstance(item.get("id"), str)}
    seen = set()
    digests = set()
    if not required or any(provider not in PROVIDERS for provider in required):
        errors.append({"code": "INVALID_REQUESTED_PROVIDERS"})
    if not isinstance(selection, list) or not selection:
        errors.append({"code": "EMPTY_OR_INVALID_SELECTION"})
        selection = []
    for item in selection:
        if not isinstance(item, dict):
            errors.append({"code": "INVALID_WORK"})
            continue
        work_id = item.get("id")
        issues = []
        if not isinstance(work_id, str) or not work_id or work_id in seen:
            issues.append("MISSING_OR_DUPLICATE_ID")
        if isinstance(work_id, str):
            seen.add(work_id)
        provider = item.get("platform")
        if not isinstance(provider, str) or provider not in PROVIDERS:
            issues.append("WRONG_CORPUS")
        accepted = known.get(work_id) if isinstance(work_id, str) else None
        if not accepted or any(item.get(key) != accepted.get(key) for key in BINDING_FIELDS):
            issues.append("UNCONFIRMED_SELECTION")
        source = (source_root / str(item.get("sourceFile", ""))).resolve()
        relative = source.relative_to(source_root) if source.is_relative_to(source_root) else None
        if relative is None or not relative.parts or source.suffix.lower() != ".mp4" or not source.is_file():
            issues.append("INVALID_SOURCE")
        else:
            folder = relative.parts[0].lower()
            # own-x is the existing explicitly selected recovery archive. Its
            # historical folder labels are not authoritative provider metadata.
            if folder != "own-x" and DIRECT_FOLDERS.get(folder) != provider:
                issues.append("WRONG_CORPUS")
        provenance = (source_root / str(item.get("provenance", ""))).resolve()
        if not provenance.is_relative_to(source_root.parent) or not provenance.is_file():
            issues.append("INVALID_PROVENANCE")
        digest = None
        if not issues:
            with source.open("rb") as handle:
                digest = hashlib.file_digest(handle, "sha256").hexdigest()
            if digest != item.get("approvedSha256"):
                issues.append("STALE_SOURCE_APPROVAL")
            elif digest in digests:
                issues.append("DUPLICATE_MEDIA")
            digests.add(digest)
        if issues:
            errors.append({"id": work_id, "codes": issues})
            continue
        valid.append({"id": work_id, "title": item.get("title", work_id), "platform": provider,
                      "sourceFile": str(source), "provenance": str(provenance), "sha256": digest})
    counts = dict(sorted(Counter(item["platform"] for item in valid).items()))
    missing = [provider for provider in required if not counts.get(provider)]
    if missing:
        errors.append({"code": "MISSING_REQUESTED_PROVIDERS", "providers": missing})
    examples = []
    for provider in required:
        match = next((item for item in valid if item["platform"] == provider), None)
        if match:
            examples.append(match)
    for item in valid:
        if len(examples) >= 3:
            break
        if item not in examples:
            examples.append(item)
    return {"corpus": "prompt-generated", "status": "PASS" if not errors else "BLOCKED",
            "sourceRoot": str(source_root), "requestedProviders": required, "providerCounts": counts,
            "selectedCount": len(selection), "verifiedCount": len(valid), "missingProviders": missing,
            "examples": examples, "errors": errors}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--require-providers", nargs="+", choices=sorted(PROVIDERS), required=True,
                        help="Providers named in the request; never infer them from discovered files.")
    parser.add_argument("--selection", type=Path, default=SELECTION, help="Read-only candidate manifest to check against the approved selection.")
    parser.add_argument("--sync", action="store_true", help="Run the existing local importer only after intake passes.")
    parser.add_argument("--copy-media", action="store_true")
    args = parser.parse_args(argv)
    if args.copy_media and not args.sync:
        parser.error("--copy-media requires --sync")
    if args.sync and args.selection.resolve() != SELECTION.resolve():
        parser.error("--sync imports only the existing approved selection; candidate manifests are read-only")
    try:
        selection = json.loads(args.selection.read_text(encoding="utf-8"))
        approved = json.loads(SELECTION.read_text(encoding="utf-8"))
        if not isinstance(approved, list):
            raise ValueError("Approved selection must be a list")
        report = inspect_intake(selection, approved, SOURCE, args.require_providers)
    except (OSError, ValueError) as exc:
        print(json.dumps({"status": "BLOCKED", "errors": [{"code": "UNREADABLE_INTAKE", "message": str(exc)}]}, ensure_ascii=False))
        return 2
    print(json.dumps(report, ensure_ascii=False, indent=2), flush=True)
    if report["status"] != "PASS":
        return 2
    if args.sync:
        command = [sys.executable, "-X", "utf8", str(ROOT / "scripts/sync-videos.py"), "--source", str(SOURCE)]
        if args.copy_media:
            command.append("--copy-media")
        return subprocess.run(command, cwd=ROOT, check=False).returncode
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
