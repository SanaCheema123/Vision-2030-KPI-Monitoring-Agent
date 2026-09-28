import pandas as pd

def clean_kpi_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [str(c).strip().lower() for c in df.columns]
    if "actual" in df:
        df["actual"] = pd.to_numeric(df["actual"], errors="coerce")
    if "target" in df:
        df["target"] = pd.to_numeric(df["target"], errors="coerce")
    return df.dropna(subset=["actual", "target"])
