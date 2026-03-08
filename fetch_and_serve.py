#!/usr/bin/env python3
"""
APEX Markets — Price Fetcher & HTTP Server

ลำดับที่ถูกต้อง:
  1. เริ่ม HTTP server ทันที (< 1 วินาที)
  2. เปิด browser → dashboard แสดง prices.json ที่มีอยู่เดิม
  3. ดาวน์โหลดข้อมูลใหม่ใน background (ไม่บล็อก server)
  4. dashboard auto-refresh ทุก 60 วิอยู่แล้ว → รับข้อมูลใหม่เอง
"""

import json, os, sys, time, threading, webbrowser
from datetime import datetime, timezone
from http.server import HTTPServer, SimpleHTTPRequestHandler
from concurrent.futures import ThreadPoolExecutor

# ── Auto-install ──────────────────────────────────────────────────────────────
def pip_install(pkg):
    print(f"Installing {pkg}…", flush=True)
    os.system(f'"{sys.executable}" -m pip install -q {pkg}')

try:
    import requests
except ImportError:
    pip_install("requests")
    import requests

try:
    import yfinance as yf
    import pandas as pd
except ImportError:
    pip_install("yfinance pandas")
    import yfinance as yf
    import pandas as pd

# ── Symbol lists ──────────────────────────────────────────────────────────────
TH_INDEX_SYMS = ["^SET.BK", "^SET50.BK", "^MAI.BK", "^SET100.BK"]
TH_STOCK_SYMS = [
    "PTT.BK", "AOT.BK", "ADVANC.BK", "KBANK.BK", "SCB.BK",
    "CPALL.BK", "GULF.BK", "BDMS.BK", "TRUE.BK", "BANPU.BK",
    "SCC.BK", "MINT.BK",
]
US_INDEX_SYMS = ["^GSPC", "^IXIC", "^DJI", "^RUT"]
US_STOCK_SYMS = [
    "NVDA", "AAPL", "TSLA", "AMZN", "MSFT", "META",
    "GOOGL", "AMD", "NFLX", "PLTR", "BRK-B", "JNJ", "V", "UNH",
]
ALL_SYMS = list(dict.fromkeys(
    TH_INDEX_SYMS + TH_STOCK_SYMS + US_INDEX_SYMS + US_STOCK_SYMS
))

PRICES_FILE = "prices.json"
PORT = 8080

# ── HTTP Server (starts immediately) ─────────────────────────────────────────
class CORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()
    def log_message(self, fmt, *args):
        if len(args) > 1 and args[1] not in ("200", "304"):
            super().log_message(fmt, *args)

_server = None

def start_server():
    global _server
    _server = HTTPServer(("", PORT), CORSHandler)
    _server.serve_forever()


# ── Technical Indicators ──────────────────────────────────────────────────────
def rsi14(c):
    d = c.diff()
    g = d.clip(lower=0).rolling(14).mean()
    l = (-d.clip(upper=0)).rolling(14).mean()
    r = (100 - 100 / (1 + g / l.replace(0, float("nan")))).dropna()
    return round(float(r.iloc[-1]), 1) if not r.empty else 50.0

def rsi_label(v):
    return "Overbought" if v >= 70 else "Oversold" if v <= 30 else "Neutral"

def macd_sig(c):
    h = (c.ewm(span=12,adjust=False).mean() - c.ewm(span=26,adjust=False).mean())
    s = h.ewm(span=9,adjust=False).mean()
    hh = (h - s).dropna()
    if len(hh) < 2: return "Neutral"
    n, p = float(hh.iloc[-1]), float(hh.iloc[-2])
    if n > 0 and p <= 0: return "Bullish Crossover"
    if n < 0 and p >= 0: return "Bearish Crossover"
    return "Bullish" if n > 0 else "Bearish"

def trend_ma(c):
    if len(c) < 50: return "Neutral"
    ma20 = float(c.rolling(20).mean().dropna().iloc[-1])
    ma50 = float(c.rolling(50).mean().dropna().iloc[-1])
    p = float(c.iloc[-1])
    if p > ma20 > ma50: return "Bullish"
    if p < ma20 < ma50: return "Bearish"
    return "Neutral"

def trade_signal(rsi, macd, tr):
    bull = sum([macd in ("Bullish Crossover","Bullish"), tr=="Bullish", rsi<60])
    bear = sum([macd in ("Bearish Crossover","Bearish"), tr=="Bearish", rsi>65])
    if bull >= 2 and rsi < 70: return "BUY"
    if bear >= 2 or rsi > 75:  return "SELL"
    return "HOLD"


# ── Phase 1: ดึงราคาปัจจุบัน (Yahoo Quote API — เร็วมาก) ──────────────────────
def fetch_quotes(syms, timeout=20):
    """ดึงราคาวันนี้ของทุก symbol ในคำขอเดียวโดยใช้ yfinance"""
    raw = {}
    try:
        # yfinance can fetch multiple tickers at once using space separation
        tickers = yf.Tickers(" ".join(syms))
        
        for sym in syms:
            info = tickers.tickers[sym].info if sym in tickers.tickers else {}
            # Fallback to fast_info if info doesn't have it
            price = info.get("currentPrice") or info.get("regularMarketPrice")
            chg = info.get("regularMarketChange")
            pct = info.get("regularMarketChangePercent")
            
            # If standard info approach is missing data (e.g. for some indices), fetch via history
            if price is None:
                hist = tickers.tickers[sym].history(period="2d")
                if not hist.empty and len(hist) >= 1:
                    price = hist["Close"].iloc[-1]
                    if len(hist) >= 2:
                        prev_close = hist["Close"].iloc[-2]
                        chg = price - prev_close
                        pct = (chg / prev_close) * 100
                    else:
                        chg = 0
                        pct = 0
            
            if price is not None:
                raw[sym] = {
                    "price":  round(float(price), 2),
                    "change": round(float(chg), 2) if chg is not None else 0,
                    "pct":    round(float(pct), 4) if pct is not None else 0,
                    # indicators ใส่ค่า default ก่อน, phase 2 จะ update
                    "rsi": 50.0, "rsiLabel": "Loading…",
                    "macd": "Loading…", "trend": "Loading…", "signal": "—",
                }
    except Exception as e:
        print(f"  Quote API (yfinance): {e}", flush=True)
    return raw


# ── Phase 2: คำนวณ indicators (background, แบ่งกลุ่มดาวน์โหลดพร้อมกัน) ─────────
def fetch_indicators_group(syms):
    result = {}
    try:
        df = yf.download(syms, period="2mo", interval="1d",
                         auto_adjust=True, progress=False, threads=False)
        if df.empty:
            return result
        close = df["Close"] if isinstance(df.columns, pd.MultiIndex) else \
                df[["Close"]].rename(columns={"Close": syms[0]})
        for sym in syms:
            if sym not in close.columns:
                continue
            c = close[sym].dropna()
            if len(c) < 2:
                continue
            r = rsi14(c); m = macd_sig(c); t = trend_ma(c)
            result[sym] = {
                "rsi": r, "rsiLabel": rsi_label(r),
                "macd": m, "trend": t, "signal": trade_signal(r, m, t),
            }
    except Exception as e:
        print(f"  Indicators group error: {e}", flush=True)
    return result


def write_json(payload):
    with open(PRICES_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)


def build_payload(raw, updated=None):
    g = lambda s: raw.get(s)
    return {
        "updated": (updated or datetime.now().astimezone()).isoformat()
                    if not isinstance(updated, str) else updated,
        "ok":    len(raw),
        "total": len(ALL_SYMS),
        "TH": {
            "indices": {s: g(s) for s in TH_INDEX_SYMS if g(s)},
            "stocks":  {s: g(s) for s in TH_STOCK_SYMS if g(s)},
        },
        "US": {
            "indices": {s: g(s) for s in US_INDEX_SYMS if g(s)},
            "stocks":  {s: g(s) for s in US_STOCK_SYMS if g(s)},
        },
    }


def background_fetch():
    """ทำงานในพื้นหลัง — ไม่บล็อก server หรือ browser"""
    # ── Phase 1: ราคาปัจจุบัน ────────────────────────────────────────────────
    print(f"[{datetime.now():%H:%M:%S}] ⚡ Phase 1: fetching live quotes…", flush=True)
    t0  = time.time()
    raw = fetch_quotes(ALL_SYMS)

    if raw:
        payload = build_payload(raw)
        write_json(payload)
        elapsed = time.time() - t0
        th = payload["TH"]["indices"].get("^SET.BK")
        sp = payload["US"]["stocks"].get("AAPL")
        print(f"[{datetime.now():%H:%M:%S}] ✅ Phase 1 done — "
              f"{len(raw)}/{len(ALL_SYMS)} quotes in {elapsed:.1f}s", flush=True)
        if th: print(f"       SET  = {th['price']:,.2f}  ({th['pct']:+.2f}%)", flush=True)
        if sp: print(f"       AAPL = {sp['price']:,.2f}  ({sp['pct']:+.2f}%)", flush=True)
    else:
        print("  ⚠️  Quote API failed — using existing prices.json", flush=True)
        # โหลด raw จาก prices.json ที่มีอยู่
        try:
            with open(PRICES_FILE, encoding="utf-8") as f:
                existing = json.load(f)
            for cat in ("indices","stocks"):
                for sym, d in existing.get("TH",{}).get(cat,{}).items():
                    raw[sym] = d
                for sym, d in existing.get("US",{}).get(cat,{}).items():
                    raw[sym] = d
        except Exception:
            pass

    print("", flush=True)

    # ── Phase 2: technical indicators (parallel groups) ───────────────────────
    print(f"[{datetime.now():%H:%M:%S}] 📊 Phase 2: computing indicators (background)…", flush=True)
    n = len(ALL_SYMS)
    chunk = (n + 3) // 4
    groups = [ALL_SYMS[i:i+chunk] for i in range(0, n, chunk)]

    with ThreadPoolExecutor(max_workers=4) as ex:
        futures = [(i, ex.submit(fetch_indicators_group, g)) for i, g in enumerate(groups)]
        for i, fut in futures:
            try:
                res = fut.result(timeout=120)
                raw.update({s: {**raw.get(s,{}), **v} for s, v in res.items()})
                print(f"  ✓ Group {i+1}: {len(res)} indicators", flush=True)
            except Exception as e:
                print(f"  ✗ Group {i+1}: {e}", flush=True)

    # เขียน prices.json อีกครั้งพร้อม indicators ครบ
    payload = build_payload(raw)
    write_json(payload)
    print(f"[{datetime.now():%H:%M:%S}] ✅ Phase 2 done — indicators updated\n", flush=True)


def refresh_loop():
    while True:
        time.sleep(300)   # refresh ทุก 5 นาที
        try:
            background_fetch()
        except Exception as e:
            print(f"Refresh error: {e}", flush=True)


# ── MAIN ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    print("=" * 60)
    print("  APEX Markets — Fetch & Serve")
    print("=" * 60)

    url = f"http://localhost:{PORT}/dashboard.html"

    # 1️⃣  เริ่ม HTTP server ก่อนเลย (พร้อมใน < 1 วินาที)
    srv_thread = threading.Thread(target=start_server, daemon=True)
    srv_thread.start()
    time.sleep(0.5)   # ให้ server bind port เสร็จก่อน

    print(f"✅  Server ready → {url}", flush=True)
    print("   Fetching fresh data in background…\n", flush=True)

    # 2️⃣  เปิด browser ทันที (แสดง prices.json เดิมก่อนได้เลย)
    try:
        webbrowser.open(url)
    except Exception:
        pass

    # 3️⃣  ดาวน์โหลดข้อมูลใหม่ใน background thread
    threading.Thread(target=background_fetch, daemon=True).start()

    # 4️⃣  วน refresh ทุก 5 นาที
    threading.Thread(target=refresh_loop, daemon=True).start()

    # 5️⃣  Main thread รอรับ Ctrl+C
    print("   Press Ctrl+C to stop\n")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nServer stopped.")
