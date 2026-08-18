#!/usr/bin/env python3
"""Volume, CPC, difficulty e suggestions DataForSEO (Italia / italiano).

Credenziali solo da ambiente o .env — mai in chiaro nel repo.
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from pathlib import Path

import requests
from requests.auth import HTTPBasicAuth

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "data" / "seo"
BASE = "https://api.dataforseo.com"
LOCATION = "Italy"
LANGUAGE = "Italian"

SEED = [
    "codice referral tesla",
    "referral tesla italia",
    "codice sconto tesla",
    "link referral tesla",
    "referral tesla 2026",
    "codice referral tesla model y",
    "referral tesla model y",
    "codice referral tesla model 3",
    "referral tesla model 3",
    "sconto tesla model y",
    "sconto tesla model 3",
    "come funziona il referral tesla",
    "programma segnala e guadagna tesla",
    "refer and earn tesla italia",
    "vantaggi referral tesla",
    "referral tesla è ufficiale",
    "il referral tesla si applica dopo l'ordine",
    "quanto valgono 1000 km supercharger",
    "referral tesla conviene",
    "quando caricare tesla 80 o 100",
    "ricarica tesla model y",
    "batteria lfp o nmc tesla",
    "caricare tesla al 100%",
    "limite carica tesla",
    "strategia ricarica tesla",
    "tempi di consegna tesla italia",
    "consegne tesla fine trimestre",
    "tesla pronta consegna",
    "quanto si aspetta una tesla",
    "aggiornamento tesla 2026",
    "tesla summer update 2026",
    "novità software tesla",
    "grok tesla",
]

EXPAND_FROM = [
    "come funziona il referral tesla",
    "ricarica tesla model y",
    "codice referral tesla",
    "tempi di consegna tesla italia",
]

SERP_SEEDS = [
    "codice referral tesla",
    "referral tesla italia",
    "codice sconto tesla",
    "referral tesla 2026",
    "codice referral tesla model y",
]


def load_dotenv() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'").strip('"')
        os.environ.setdefault(key, value)


def auth() -> HTTPBasicAuth:
    login = os.environ.get("DATAFORSEO_LOGIN", "").strip()
    password = os.environ.get("DATAFORSEO_PASSWORD", "").strip()
    if not login or not password:
        sys.exit(
            "Mancano DATAFORSEO_LOGIN e DATAFORSEO_PASSWORD. "
            "Copiali in .env (vedi .env.example) oppure esportali nella shell."
        )
    return HTTPBasicAuth(login, password)


def post(path: str, payload: dict, credentials: HTTPBasicAuth) -> dict:
    response = requests.post(
        BASE + path,
        json=[payload],
        auth=credentials,
        timeout=60,
    )
    response.raise_for_status()
    data = response.json()
    status = data.get("status_code")
    if status and int(status) >= 40000:
        raise RuntimeError(data.get("status_message") or f"DataForSEO error {status}")
    return data


def search_volume(keywords: list[str], credentials: HTTPBasicAuth) -> dict:
    data = post(
        "/v3/keywords_data/google_ads/search_volume/live",
        {"location_name": LOCATION, "language_name": LANGUAGE, "keywords": keywords},
        credentials,
    )
    out: dict = {}
    for task in data.get("tasks") or []:
        for item in task.get("result") or []:
            out[item["keyword"]] = {
                "volume": item.get("search_volume"),
                "cpc": item.get("cpc"),
                "competition": item.get("competition"),
            }
    return out


def difficulty(keywords: list[str], credentials: HTTPBasicAuth) -> dict:
    data = post(
        "/v3/dataforseo_labs/google/bulk_keyword_difficulty/live",
        {"location_name": LOCATION, "language_name": LANGUAGE, "keywords": keywords},
        credentials,
    )
    out: dict = {}
    for task in data.get("tasks") or []:
        for item in task.get("result") or []:
            for row in item.get("items") or []:
                out[row["keyword"]] = row.get("keyword_difficulty")
    return out


def suggestions(seed_keyword: str, credentials: HTTPBasicAuth, limit: int = 50) -> list[dict]:
    data = post(
        "/v3/dataforseo_labs/google/keyword_suggestions/live",
        {
            "location_name": LOCATION,
            "language_name": LANGUAGE,
            "keyword": seed_keyword,
            "limit": limit,
            "order_by": ["keyword_info.search_volume,desc"],
        },
        credentials,
    )
    rows: list[dict] = []
    for task in data.get("tasks") or []:
        for item in task.get("result") or []:
            for row in item.get("items") or []:
                info = row.get("keyword_info") or {}
                rows.append(
                    {
                        "keyword": row.get("keyword"),
                        "volume": info.get("search_volume"),
                        "cpc": info.get("cpc"),
                        "competition": info.get("competition"),
                    }
                )
    return rows


def serp_features(keyword: str, credentials: HTTPBasicAuth) -> list[str]:
    data = post(
        "/v3/serp/google/organic/live/advanced",
        {
            "location_name": LOCATION,
            "language_name": LANGUAGE,
            "keyword": keyword,
            "device": "mobile",
            "depth": 10,
        },
        credentials,
    )
    types: list[str] = []
    for task in data.get("tasks") or []:
        for item in task.get("result") or []:
            types.extend(item.get("item_types") or [])
    return sorted(set(types))


def write_csv(path: Path, header: list[str], rows: list[list]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(header)
        writer.writerows(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description="Valida i seed keyword su DataForSEO (IT).")
    parser.add_argument(
        "--serp",
        action="store_true",
        help="Aggiunge SERP feature (AI Overview, PAA, …) sui 5 seed transazionali.",
    )
    args = parser.parse_args()

    load_dotenv()
    credentials = auth()

    vol = search_volume(SEED, credentials)
    diff = difficulty(SEED, credentials)
    seed_rows = [
        [
            keyword,
            (vol.get(keyword) or {}).get("volume"),
            (vol.get(keyword) or {}).get("cpc"),
            (vol.get(keyword) or {}).get("competition"),
            diff.get(keyword),
        ]
        for keyword in SEED
    ]
    seed_path = OUT_DIR / "keywords_seed.csv"
    write_csv(
        seed_path,
        ["keyword", "volume", "cpc", "competition", "difficulty"],
        seed_rows,
    )
    print(f"→ {seed_path.relative_to(ROOT)}")

    seen: set[str] = set()
    suggestion_rows: list[list] = []
    for seed in EXPAND_FROM:
        for row in suggestions(seed, credentials, limit=50):
            key = row["keyword"]
            if not key or key in seen:
                continue
            seen.add(key)
            suggestion_rows.append(
                [seed, key, row["volume"], row["cpc"], row["competition"]]
            )
    suggestions_path = OUT_DIR / "keywords_suggestions.csv"
    write_csv(
        suggestions_path,
        ["seed", "keyword", "volume", "cpc", "competition"],
        suggestion_rows,
    )
    print(f"→ {suggestions_path.relative_to(ROOT)}")

    if args.serp:
        serp_rows = []
        for keyword in SERP_SEEDS:
            types = serp_features(keyword, credentials)
            serp_rows.append([keyword, "|".join(types)])
        serp_path = OUT_DIR / "keywords_serp.csv"
        write_csv(serp_path, ["keyword", "item_types"], serp_rows)
        print(f"→ {serp_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
