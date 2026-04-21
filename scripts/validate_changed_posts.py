#!/usr/bin/env python3
"""Validate changed Hugo posts before deploy.

Checks:
- explicit slug exists
- slug is ASCII
- published posts are not dated in the future (UTC)
"""

from __future__ import annotations

import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


FRONTMATTER_BOUNDARY = re.compile(r"^---\s*$")
SLUG_RE = re.compile(r'^slug:\s*"?([^"\n]+)"?\s*$')
DATE_RE = re.compile(r'^date:\s*"?([^"\n]+)"?\s*$')
DRAFT_RE = re.compile(r"^draft:\s*(true|false)\s*$", re.IGNORECASE)


def parse_frontmatter(path: Path) -> dict[str, str]:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or not FRONTMATTER_BOUNDARY.match(lines[0]):
        raise ValueError("Missing YAML frontmatter opening '---'")

    frontmatter: dict[str, str] = {}
    for line in lines[1:]:
        if FRONTMATTER_BOUNDARY.match(line):
            break

        for pattern, key in ((SLUG_RE, "slug"), (DATE_RE, "date"), (DRAFT_RE, "draft")):
            match = pattern.match(line)
            if match:
                frontmatter[key] = match.group(1).strip()
                break

    return frontmatter


def parse_iso8601(value: str) -> datetime:
    normalized = value.replace("Z", "+00:00")
    parsed = datetime.fromisoformat(normalized)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def validate_post(path: Path, now_utc: datetime) -> list[str]:
    errors: list[str] = []

    try:
        frontmatter = parse_frontmatter(path)
    except Exception as exc:  # pragma: no cover - surfaced in CI output
        return [f"{path}: {exc}"]

    slug = frontmatter.get("slug")
    if not slug:
        errors.append(f"{path}: Missing explicit slug in frontmatter.")
    else:
        try:
            slug.encode("ascii")
        except UnicodeEncodeError:
            errors.append(f"{path}: slug must be ASCII, got {slug!r}.")

    raw_date = frontmatter.get("date")
    if not raw_date:
        errors.append(f"{path}: Missing date in frontmatter.")
    else:
        try:
            publish_date = parse_iso8601(raw_date)
        except ValueError:
            errors.append(f"{path}: Invalid ISO-8601 date {raw_date!r}.")
        else:
            is_draft = frontmatter.get("draft", "false").lower() == "true"
            # Small tolerance avoids false positives when build starts a few seconds later.
            if not is_draft and publish_date > now_utc + timedelta(seconds=30):
                errors.append(
                    f"{path}: date {raw_date} is in the future (UTC). "
                    "Published posts with future dates are skipped by Hugo."
                )

    return errors


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: validate_changed_posts.py <post> [<post> ...]", file=sys.stderr)
        return 1

    now_utc = datetime.now(timezone.utc)
    errors: list[str] = []
    for name in argv[1:]:
        errors.extend(validate_post(Path(name), now_utc))

    if errors:
        for error in errors:
            print(error, file=sys.stderr)
        return 1

    print(f"Validated {len(argv) - 1} changed post(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
