from pathlib import Path

def retrieve_context(query: str) -> str:
    docs = Path(__file__).resolve().parents[3] / "data" / "documents"
    if not docs.exists():
        return "No project documents are available."
    names = [p.name for p in docs.iterdir() if p.is_file()]
    return "Available verified project documents: " + ", ".join(names)
