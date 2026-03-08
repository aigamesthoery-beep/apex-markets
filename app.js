// ===== APEX MARKETS — app.js =====
// PRIMARY:  ดึงข้อมูลตรงจาก Yahoo Finance Quote API (ข้อมูลตรงกับ Yahoo 100%)
// FALLBACK: prices.json (จาก fetch_and_serve.py) → static data

// ── STATIC FALLBACK DATA ──────────────────────────────────────────────────────
const STATIC = {
  TH: {
    indices: [
      { name: 'SET Index', value: '—', change: '—', pct: '—', up: true },
      { name: 'SET50', value: '—', change: '—', pct: '—', up: true },
      { name: 'mai Index', value: '—', change: '—', pct: '—', up: true },
    ],
    technicalPicks: [
      { symbol: 'PTT', name: 'PTT Public Co.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'AOT', name: 'Airports of Thailand', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'ADVANC', name: 'Advanced Info Service', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'KBANK', name: 'Kasikornbank', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'SCB', name: 'SCB X Public Co.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'CPALL', name: 'CP ALL Public Co.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'GULF', name: 'Gulf Energy Dev.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'BDMS', name: 'Bangkok Dusit Medical', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'TRUE', name: 'True Corporation', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'BANPU', name: 'Banpu Public Co.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'SCC', name: 'Siam Cement Group', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'MINT', name: 'Minor International', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
    ],
    fundamentalPicks: [],
  },
  US: {
    indices: [
      { name: 'S&P 500', value: '—', change: '—', pct: '—', up: true },
      { name: 'NASDAQ', value: '—', change: '—', pct: '—', up: true },
      { name: 'Dow Jones', value: '—', change: '—', pct: '—', up: true },
      { name: 'Russell 2000', value: '—', change: '—', pct: '—', up: true },
    ],
    technicalPicks: [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'AAPL', name: 'Apple Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'META', name: 'Meta Platforms', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'PLTR', name: 'Palantir Technologies', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'JNJ', name: 'Johnson & Johnson', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'V', name: 'Visa Inc.', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
      { symbol: 'UNH', name: 'UnitedHealth Group', price: '—', change: '—', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Neutral', signal: 'HOLD' },
    ],
    fundamentalPicks: [],
  },
};

// ── LIVE MARKET DATA (populated from prices.json) ─────────────────────────────
let MARKET_DATA = JSON.parse(JSON.stringify(STATIC));

// ── GURU DATA (static — 13F filings) ─────────────────────────────────────────
const GURU_DATA = [
  {
    name: 'Warren Buffett', fund: 'Berkshire Hathaway', emoji: '🎩',
    bg: 'linear-gradient(135deg,rgba(245,158,11,.15),rgba(245,158,11,.04))',
    updated: 'Q4 2025 (13F Filing)',
    link: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001067983&type=13F',
    holdings: [
      { ticker: 'AAPL', pct: '28.1%', change: 'Reduced', type: 'reduced' },
      { ticker: 'BAC', pct: '12.4%', change: 'Held', type: 'added' },
      { ticker: 'AXP', pct: '10.8%', change: 'Held', type: 'added' },
      { ticker: 'KO', pct: '8.5%', change: 'Held', type: 'added' },
      { ticker: 'CVX', pct: '6.2%', change: 'Added', type: 'added' },
    ]
  },
  {
    name: 'Charlie Munger', fund: 'Legacy Portfolio (DJCO)', emoji: '🦅',
    bg: 'linear-gradient(135deg,rgba(99,102,241,.15),rgba(99,102,241,.04))',
    updated: 'Final 13F Filing',
    link: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000783412&type=13F',
    holdings: [
      { ticker: 'BAC', pct: '48.2%', change: 'Held', type: 'added' },
      { ticker: 'WFC', pct: '18.5%', change: 'Held', type: 'added' },
      { ticker: 'BABA', pct: '15.3%', change: 'Held', type: 'reduced' },
      { ticker: 'USB', pct: '10.8%', change: 'Held', type: 'added' },
      { ticker: 'POSCO', pct: '7.2%', change: 'Held', type: 'added' },
    ]
  },
  {
    name: 'Ray Dalio', fund: 'Bridgewater Associates', emoji: '🌊',
    bg: 'linear-gradient(135deg,rgba(34,211,238,.15),rgba(34,211,238,.04))',
    updated: 'Q4 2025 (13F Filing)',
    link: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001350694&type=13F',
    holdings: [
      { ticker: 'SPY', pct: '8.5%', change: 'Added', type: 'added' },
      { ticker: 'IEMG', pct: '7.2%', change: 'Added', type: 'added' },
      { ticker: 'GOOGL', pct: '4.8%', change: 'New', type: 'new' },
      { ticker: 'NVDA', pct: '3.5%', change: 'Added', type: 'added' },
      { ticker: 'PG', pct: '3.1%', change: 'Reduced', type: 'reduced' },
    ]
  },
  {
    name: 'Cathie Wood', fund: 'ARK Invest', emoji: '🔥',
    bg: 'linear-gradient(135deg,rgba(239,68,68,.15),rgba(239,68,68,.04))',
    updated: 'Feb 2026',
    link: 'https://ark-funds.com/funds/arkk/',
    holdings: [
      { ticker: 'TSLA', pct: '11.2%', change: 'Added', type: 'added' },
      { ticker: 'COIN', pct: '7.8%', change: 'Added', type: 'added' },
      { ticker: 'ROKU', pct: '6.5%', change: 'Held', type: 'added' },
      { ticker: 'PLTR', pct: '5.2%', change: 'New', type: 'new' },
      { ticker: 'SQ', pct: '4.8%', change: 'Added', type: 'added' },
    ]
  },
  {
    name: 'Peter Lynch', fund: 'Lynch-Style Picks', emoji: '🧮',
    bg: 'linear-gradient(135deg,rgba(16,185,129,.15),rgba(16,185,129,.04))',
    updated: 'Growth at Reasonable Price',
    link: 'https://finance.yahoo.com/',
    holdings: [
      { ticker: 'COST', pct: 'PEG 0.9', change: 'Value', type: 'added' },
      { ticker: 'HD', pct: 'PEG 1.1', change: 'Value', type: 'added' },
      { ticker: 'UNP', pct: 'PEG 1.0', change: 'Growth', type: 'new' },
      { ticker: 'SBUX', pct: 'PEG 0.8', change: 'Value', type: 'added' },
      { ticker: 'DIS', pct: 'PEG 1.2', change: 'Turnaround', type: 'new' },
    ]
  },
];

// ── NEWS DATA ─────────────────────────────────────────────────────────────────
const NEWS_DATA = [
  { headline: 'Federal Reserve Signals Potential Rate Cut in Q2 2026 as Inflation Cools', source: 'Reuters', time: '15 min ago', sentiment: 'positive', category: 'usa', tags: ['SPY', 'QQQ', 'TLT'], url: 'https://www.reuters.com/markets/' },
  { headline: 'SET Index Rallies on Foreign Inflows and Tourism Recovery', source: 'Bangkok Post', time: '32 min ago', sentiment: 'positive', category: 'thailand', tags: ['SET', 'AOT', 'MINT'], url: 'https://www.bangkokpost.com/business' },
  { headline: 'NVIDIA Unveils Next-Gen Blackwell Ultra GPUs', source: 'CNBC', time: '1 hr ago', sentiment: 'positive', category: 'usa', tags: ['NVDA', 'AMD', 'SMCI'], url: 'https://www.cnbc.com/technology/' },
  { headline: 'Bitcoin Breaks $105,000 Resistance Level Amid Institutional Buying', source: 'CoinDesk', time: '1 hr ago', sentiment: 'positive', category: 'crypto', tags: ['BTC', 'COIN', 'MSTR'], url: 'https://www.coindesk.com/markets/' },
  { headline: 'Bank of Thailand Holds Interest Rate Steady at 2.25%', source: 'Krungthep Turakij', time: '2 hrs ago', sentiment: 'neutral', category: 'thailand', tags: ['KBANK', 'SCB', 'BBL'], url: 'https://www.bangkokbiznews.com/' },
  { headline: 'Tesla Deliveries Miss Q1 Estimates, Shares Fall 2%', source: 'Bloomberg', time: '2 hrs ago', sentiment: 'negative', category: 'usa', tags: ['TSLA', 'RIVN', 'F'], url: 'https://www.bloomberg.com/markets' },
  { headline: 'Thai Baht Strengthens Against USD on Trade Surplus Data', source: 'SET News', time: '3 hrs ago', sentiment: 'positive', category: 'economy', tags: ['THB', 'SET'], url: 'https://www.set.or.th/en/home' },
  { headline: 'Apple Expected to Launch AI-Powered iPhone 17 in September', source: 'Reuters', time: '3 hrs ago', sentiment: 'positive', category: 'usa', tags: ['AAPL', 'QCOM', 'TSM'], url: 'https://www.reuters.com/technology/' },
  { headline: 'Ethereum 2.0 Staking Yields Attract Record Capital Inflows', source: 'CoinDesk', time: '4 hrs ago', sentiment: 'positive', category: 'crypto', tags: ['ETH', 'LDO'], url: 'https://www.coindesk.com/markets/' },
  { headline: 'Global Oil Prices Drop 3% on OPEC+ Production Increase Plans', source: 'Bloomberg', time: '4 hrs ago', sentiment: 'negative', category: 'economy', tags: ['PTT', 'XOM', 'CVX'], url: 'https://www.bloomberg.com/energy' },
  { headline: 'CP ALL Reports Strong Q4 Earnings, Beats Analyst Estimates', source: 'SET News', time: '5 hrs ago', sentiment: 'positive', category: 'thailand', tags: ['CPALL', 'MAKRO'], url: 'https://www.set.or.th/en/home' },
  { headline: 'Meta AI Assistant Reaches 1 Billion Users Milestone', source: 'CNBC', time: '6 hrs ago', sentiment: 'positive', category: 'usa', tags: ['META', 'GOOGL', 'MSFT'], url: 'https://www.cnbc.com/technology/' },
];

const TICKER_FALLBACK = [
  { symbol: 'NVDA', text: '+4.25% — Blackwell Ultra GPUs unveiled' },
  { symbol: 'SET', text: '+0.88% — Foreign inflows boost Thai market' },
  { symbol: 'BTC', text: '$105,230 — New all-time high' },
  { symbol: 'AAPL', text: '+0.95% — iPhone 17 AI features confirmed' },
  { symbol: 'TSLA', text: '-2.15% — Q1 deliveries miss estimates' },
  { symbol: 'KBANK', text: '+1.07% — BoT holds rate steady' },
  { symbol: 'META', text: '+2.44% — AI assistant hits 1B users' },
  { symbol: 'PTT', text: '+2.17% — Energy sector rallies' },
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let currentMarket = localStorage.getItem('selectedMarket') || 'TH';
let currentNewsFilter = 'all';
let dataLoaded = false;

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMarketToggle();
  initTabs();
  initNewsFilters();
  initGoTopButton();
  initModal();
  initClock();
  renderNewsTicker(TICKER_FALLBACK);
  renderAll();           // show skeleton / fallback first
  loadFromYahoo();       // ดึงข้อมูลตรงจาก Yahoo Finance API
});

// ── YAHOO FINANCE DIRECT FETCH (PRIMARY) ──────────────────────────────────────
// Symbol arrays สำหรับ Yahoo Finance API (ตรงกับ yfinance)
const YF_TH_INDEX = ['^SET.BK', '^SET50.BK', '^MAI.BK', '^SET100.BK'];
const YF_TH_STOCK = [
  'PTT.BK', 'AOT.BK', 'ADVANC.BK', 'KBANK.BK', 'SCB.BK',
  'CPALL.BK', 'GULF.BK', 'BDMS.BK', 'TRUE.BK', 'BANPU.BK', 'SCC.BK', 'MINT.BK',
];
const YF_US_INDEX = ['^GSPC', '^IXIC', '^DJI', '^RUT'];
const YF_US_STOCK = [
  'NVDA', 'AAPL', 'TSLA', 'AMZN', 'MSFT', 'META',
  'GOOGL', 'AMD', 'NFLX', 'PLTR', 'BRK-B', 'JNJ', 'V', 'UNH',
];
const YF_ALL = [...YF_TH_INDEX, ...YF_TH_STOCK, ...YF_US_INDEX, ...YF_US_STOCK];

async function loadFromYahoo() {
  try {
    // ✅ เรียกผ่าน /api/quotes (Node.js proxy — ไม่มีปัญหา CORS)
    // Node จะ forward ไป Yahoo Finance เอง
    const res = await fetch('/api/quotes?symbols=' + YF_ALL.join(','));
    if (!res.ok) throw new Error('Proxy HTTP ' + res.status);
    const data = await res.json();
    const quotes = data?.quoteResponse?.result || [];
    if (!quotes.length) throw new Error('Empty result from proxy');

    // สร้าง lookup map: symbol → quote object
    const qmap = {};
    for (const q of quotes) qmap[q.symbol] = q;

    // แปลงเป็น format เดียวกับ prices.json
    const pricesJson = buildFromYahooQuotes(qmap);
    applyPricesJSON(pricesJson);
    console.log(`✅ Yahoo Finance (proxy): ${quotes.length}/${YF_ALL.length} loaded`);

    // Refresh ทุก 60 วินาที
    setTimeout(loadFromYahoo, 60000);
  } catch (e) {
    // Proxy ล้มเหลว (ไม่มี Node server?) → ใช้ prices.json แทน
    console.warn('Quote proxy failed:', e.message, '→ falling back to prices.json');
    loadPricesJSON();
  }
}

function buildFromYahooQuotes(qmap) {
  const toEntry = sym => {
    const q = qmap[sym];
    if (!q) return null;
    return {
      price: q.regularMarketPrice ?? 0,
      change: q.regularMarketChange ?? 0,
      pct: q.regularMarketChangePercent ?? 0,
      // Technical indicators ยังไม่มีจาก Quote API → ใช้ค่า defaults
      rsi: 50, rsiLabel: 'N/A', macd: 'N/A', trend: 'N/A', signal: 'HOLD',
    };
  };
  const toDict = (syms) => Object.fromEntries(
    syms.map(s => [s, toEntry(s)]).filter(([, v]) => v)
  );
  return {
    updated: new Date().toISOString(),
    ok: Object.keys(qmap).length,
    total: YF_ALL.length,
    TH: { indices: toDict(YF_TH_INDEX), stocks: toDict(YF_TH_STOCK) },
    US: { indices: toDict(YF_US_INDEX), stocks: toDict(YF_US_STOCK) },
  };
}

// ── LOAD prices.json (FALLBACK) ───────────────────────────────────────────────
async function loadPricesJSON() {
  try {
    const res = await fetch('prices.json?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    applyPricesJSON(json);
    setTimeout(loadPricesJSON, 60000);
  } catch (e) {
    console.warn('prices.json not available — using static data.', e.message);
    setTimeout(loadPricesJSON, 10000);
  }
}

// ── Name maps for display ─────────────────────────────────────────────────────
const TH_INDEX_NAMES = {
  '^SET.BK': 'SET Index',
  '^SET50.BK': 'SET50',
  '^MAI.BK': 'mai Index',
  '^SET100.BK': 'SET100',
};
const US_INDEX_NAMES = {
  '^GSPC': 'S&P 500',
  '^IXIC': 'NASDAQ',
  '^DJI': 'Dow Jones',
  '^RUT': 'Russell 2000',
};
const TH_STOCK_NAMES = {
  'PTT.BK': 'PTT Public Co.',
  'AOT.BK': 'Airports of Thailand',
  'ADVANC.BK': 'Advanced Info Service',
  'KBANK.BK': 'Kasikornbank',
  'SCB.BK': 'SCB X Public Co.',
  'CPALL.BK': 'CP ALL Public Co.',
  'GULF.BK': 'Gulf Energy Dev.',
  'BDMS.BK': 'Bangkok Dusit Medical',
  'TRUE.BK': 'True Corporation',
  'BANPU.BK': 'Banpu Public Co.',
  'SCC.BK': 'Siam Cement Group',
  'MINT.BK': 'Minor International',
};
const US_STOCK_NAMES = {
  'NVDA': 'NVIDIA Corporation',
  'AAPL': 'Apple Inc.',
  'TSLA': 'Tesla, Inc.',
  'AMZN': 'Amazon.com, Inc.',
  'MSFT': 'Microsoft Corp.',
  'META': 'Meta Platforms',
  'GOOGL': 'Alphabet Inc.',
  'AMD': 'Advanced Micro Devices',
  'NFLX': 'Netflix Inc.',
  'PLTR': 'Palantir Technologies',
  'BRK-B': 'Berkshire Hathaway',
  'JNJ': 'Johnson & Johnson',
  'V': 'Visa Inc.',
  'UNH': 'UnitedHealth Group',
};

// Convert prices.json {symbol: {...}} dict → array expected by renderAll()
function parsePricesJSON(json) {
  const fmtChg = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? '0.00' : (n >= 0 ? '+' : '') + Math.abs(n).toFixed(2);
  };
  const fmtPct = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? '0.00%' : (n >= 0 ? '+' : '') + Math.abs(n).toFixed(2) + '%';
  };
  const fmtPrice = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? '—' : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const parseIndices = (rawDict, nameMap) =>
    Object.entries(rawDict || {}).map(([sym, d]) => ({
      name: nameMap[sym] || sym,
      value: fmtPrice(d.price),
      change: fmtChg(d.change),
      pct: fmtPct(d.pct),
      up: d.change >= 0,
    }));

  const parseStocks = (rawDict, nameMap, stripSuffix) =>
    Object.entries(rawDict || {}).map(([sym, d]) => {
      const displaySym = stripSuffix ? sym.replace(/\.BK$/, '') : sym;
      return {
        symbol: displaySym,
        name: nameMap[sym] || displaySym,
        price: fmtPrice(d.price),
        change: fmtChg(d.change),
        pct: fmtPct(d.pct),
        up: d.change >= 0,
        rsi: d.rsi,
        rsiLabel: d.rsiLabel,
        macd: d.macd,
        trend: d.trend,
        signal: d.signal,
      };
    });

  return {
    TH: {
      indices: parseIndices(json.TH?.indices, TH_INDEX_NAMES),
      technicalPicks: parseStocks(json.TH?.stocks, TH_STOCK_NAMES, true),
      fundamentalPicks: [],
    },
    US: {
      indices: parseIndices(json.US?.indices, US_INDEX_NAMES),
      technicalPicks: parseStocks(json.US?.stocks, US_STOCK_NAMES, false),
      fundamentalPicks: [],
    },
  };
}

function applyPricesJSON(json) {
  const parsed = parsePricesJSON(json);

  // Merge parsed data into MARKET_DATA
  if (parsed.TH.indices.length) MARKET_DATA.TH.indices = parsed.TH.indices;
  if (parsed.TH.technicalPicks.length) MARKET_DATA.TH.technicalPicks = parsed.TH.technicalPicks;
  if (parsed.US.indices.length) MARKET_DATA.US.indices = parsed.US.indices;
  if (parsed.US.technicalPicks.length) MARKET_DATA.US.technicalPicks = parsed.US.technicalPicks;

  // Build live ticker from merged MARKET_DATA
  const tickerItems = buildLiveTicker();
  renderNewsTicker(tickerItems);

  // Update "updated" timestamp
  const upd = document.getElementById('news-updated');
  if (upd && json.updated) {
    const d = new Date(json.updated);
    upd.textContent = `Updated ${d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`;
  }

  dataLoaded = true;
  renderAll();
  showLiveBadge();
}

function buildLiveTicker() {
  const items = [];
  ['TH', 'US'].forEach(mkt => {
    (MARKET_DATA[mkt]?.technicalPicks || []).forEach(s => {
      const arrow = s.up ? '▲' : '▼';
      const pct = s.pct || '';
      items.push({ symbol: s.symbol, text: `${arrow} ${pct} — ${s.name}` });
    });
  });
  return items.length > 0 ? items : TICKER_FALLBACK;
}

function showLiveBadge() {
  const badge = document.querySelector('.ticker-label');
  if (badge) badge.textContent = '🟢 LIVE';
}

// ── CLOCK ─────────────────────────────────────────────────────────────────────
function initClock() {
  const el = document.getElementById('sclock');
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  };
  tick();
  setInterval(tick, 1000);
}

// ── MARKET TOGGLE ─────────────────────────────────────────────────────────────
function initMarketToggle() {
  const th = document.getElementById('t-th');
  const us = document.getElementById('t-us');
  if (!th || !us) return;
  th.addEventListener('click', () => switchMarket('TH'));
  us.addEventListener('click', () => switchMarket('US'));
  updateToggleUI();
}

function switchMarket(market) {
  currentMarket = market;
  localStorage.setItem('selectedMarket', market);
  updateToggleUI();
  renderAll();
}

function updateToggleUI() {
  const th = document.getElementById('t-th');
  const us = document.getElementById('t-us');
  const slider = document.getElementById('tslider');
  if (!th || !us || !slider) return;
  th.classList.toggle('on', currentMarket === 'TH');
  us.classList.toggle('on', currentMarket === 'US');
  slider.classList.toggle('us', currentMarket === 'US');
  updateMarketStatus();
}

function updateMarketStatus() {
  const txt = document.getElementById('stxt');
  const dot = document.getElementById('sdot');
  if (!txt || !dot) return;
  const d = currentMarket === 'TH'
    ? { flag: '🇹🇭', exchange: 'SET / mai', hours: '10:00–16:30 ICT' }
    : { flag: '🇺🇸', exchange: 'NYSE / NASDAQ', hours: '09:30–16:00 ET' };
  const now = new Date();
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const inMins = utcH * 60 + utcM;
  const isOpen = currentMarket === 'TH'
    ? inMins >= 180 && inMins < 570      // 03:00–09:30 UTC = SET open
    : inMins >= 870 && inMins < 1260;   // 14:30–21:00 UTC = NYSE open
  txt.textContent = `${d.flag} ${d.exchange} — ${isOpen ? 'Open' : 'Closed'} · ${d.hours}`;
  dot.className = 'dot ' + (isOpen ? 'on' : 'off');
}

// ── RENDER ALL ────────────────────────────────────────────────────────────────
function renderAll() {
  renderIndexCards();
  renderMainChart();
  renderTechnicalTab();
  renderFundamentalTab();
  renderGuruTab();
  renderNewsTab();
  renderHeroNews();
}

// ── INDEX CARDS ───────────────────────────────────────────────────────────────
function renderIndexCards() {
  const el = document.getElementById('idx-cards');
  if (!el) return;
  const indices = MARKET_DATA[currentMarket]?.indices || [];
  el.innerHTML = indices.map(idx => `
    <div class="gc idx-card">
      <div class="idx-name">${idx.name}</div>
      <div class="idx-val">${idx.value}</div>
      <div class="idx-chg ${idx.up ? 'up' : 'dn'}">
        ${idx.up ? '▲' : '▼'} ${idx.change} (${idx.pct})
      </div>
    </div>
  `).join('');
}

// ── MAIN CHART ────────────────────────────────────────────────────────────────
function renderMainChart() {
  const el = document.getElementById('tv-chart');
  if (!el) return;
  const data = MARKET_DATA[currentMarket];
  const url = currentMarket === 'TH'
    ? 'https://www.settrade.com/th/equities/market-data/overview'
    : 'https://finance.yahoo.com/';
  const prov = currentMarket === 'TH' ? 'Settrade' : 'Yahoo Finance';
  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:520px;flex-direction:column;gap:1.5rem;">
      <div style="font-size:4rem;">📊</div>
      <div style="font-size:1.4rem;font-weight:800;color:var(--txt);">
        ${currentMarket === 'TH' ? '🇹🇭 Thailand' : '🇺🇸 USA'} Market Overview
      </div>
      <div style="font-size:.9rem;color:var(--txt3);max-width:460px;text-align:center;line-height:1.6;">
        View live interactive charts &amp; real-time data on ${prov}.
      </div>
      <a href="${url}" target="_blank" rel="noopener"
         style="padding:.75rem 2.25rem;background:linear-gradient(135deg,var(--accent),var(--cyan));color:#fff;border-radius:99px;font-weight:700;text-decoration:none;box-shadow:0 4px 18px rgba(99,102,241,.35);">
        Open Live Market on ${prov} ↗
      </a>
    </div>
  `;
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tbtn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      document.querySelectorAll('.tpanel').forEach(p => p.classList.remove('on'));
      const pan = document.getElementById('tab-' + btn.dataset.tab);
      if (pan) pan.classList.add('on');
    });
  });
}

// ── MINI SVG SPARKLINE ────────────────────────────────────────────────────────
function miniSVG(isUp) {
  const pts = [];
  let y = 30;
  for (let i = 0; i <= 20; i++) {
    y += (Math.random() - (isUp ? 0.4 : 0.6)) * 8;
    y = Math.max(5, Math.min(55, y));
    pts.push(`${i * 15},${y}`);
  }
  const c = isUp ? '#10b981' : '#ef4444';
  const id = 'g' + Math.random().toString(36).substr(2, 6);
  return `<svg viewBox="0 0 300 60" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="0,60 ${pts.join(' ')} 300,60" fill="url(#${id})"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ── TECHNICAL TAB ─────────────────────────────────────────────────────────────
function renderTechnicalTab() {
  const el = document.getElementById('tech-grid');
  if (!el) return;
  const picks = MARKET_DATA[currentMarket]?.technicalPicks || [];
  const cur = currentMarket === 'TH' ? '฿' : '$';

  if (!picks.length) {
    el.innerHTML = '<div style="color:var(--txt3);padding:2rem;grid-column:1/-1;text-align:center;">⏳ Loading live data…</div>';
    return;
  }

  el.innerHTML = picks.map((s, i) => {
    const macdIcon = s.macd === 'Bullish Crossover' ? '↗' : s.macd === 'Bearish Crossover' ? '↘' : '→';
    const trendCls = (s.trend === 'Bullish') ? 'bdg-up' : (s.trend === 'Bearish') ? 'bdg-dn' : 'bdg-rsi';
    const sigCls = s.signal === 'BUY' ? 'sig-buy' : s.signal === 'SELL' ? 'sig-sell' : 'sig-hold';
    const sigIcon = s.signal === 'BUY' ? '🟢' : s.signal === 'SELL' ? '🔴' : '🟡';
    const chartUrl = currentMarket === 'TH'
      ? `https://www.settrade.com/th/equities/quote/${s.symbol}/overview`
      : `https://finance.yahoo.com/quote/${s.symbol}`;
    return `
      <div class="gc sc" onclick="window.open('${chartUrl}','_blank')" title="View ${s.symbol} on ${currentMarket === 'TH' ? 'Settrade' : 'Yahoo Finance'}">
        <div class="sc-head">
          <div class="sc-logo">${s.symbol.substring(0, 2)}</div>
          <div class="sc-info"><h3>${s.symbol}</h3><div class="cn">${s.name}</div></div>
        </div>
        <div class="sc-price">
          <span class="p">${s.price !== '—' ? cur : ''}${s.price}</span>
          <span class="ch ${s.up ? 'up' : 'dn'}">${s.up ? '▲' : '▼'} ${s.change}</span>
        </div>
        <div class="mini-ch">${miniSVG(s.up)}</div>
        <div class="bdg-row">
          <span class="bdg bdg-rsi">RSI ${s.rsi} · ${s.rsiLabel}</span>
          <span class="bdg bdg-macd">${macdIcon} ${s.macd}</span>
        </div>
        <div class="bdg-row">
          <span class="bdg ${trendCls}">${s.trend === 'Bullish' ? '📈' : s.trend === 'Bearish' ? '📉' : '➡️'} ${s.trend}</span>
        </div>
        <div style="margin-top:.5rem;"><span class="sig ${sigCls}">${sigIcon} ${s.signal}</span></div>
      </div>`;
  }).join('');
}

// ── FUNDAMENTAL TAB ───────────────────────────────────────────────────────────
function renderFundamentalTab() {
  const el = document.getElementById('fund-grid');
  if (!el) return;
  const picks = MARKET_DATA[currentMarket]?.fundamentalPicks || [];
  const cur = currentMarket === 'TH' ? '฿' : '$';

  if (!picks.length) {
    el.innerHTML = '<div style="color:var(--txt3);padding:2rem;grid-column:1/-1;text-align:center;">⏳ Loading fundamental data…</div>';
    return;
  }

  el.innerHTML = picks.map(s => {
    const cp = parseFloat((s.current || '0').replace(/,/g, ''));
    const tp = parseFloat((s.target || '0').replace(/,/g, ''));
    const upside = tp && cp ? ((tp - cp) / cp * 100).toFixed(1) : '0.0';
    const barPct = tp && cp ? Math.min(100, (cp / tp * 100)).toFixed(1) : '50';
    const isUp = tp > cp;
    const stars = '★'.repeat(s.stars || 3) + '☆'.repeat(5 - (s.stars || 3));
    const chartUrl = currentMarket === 'TH'
      ? `https://www.settrade.com/th/equities/quote/${s.symbol}/overview`
      : `https://finance.yahoo.com/quote/${s.symbol}`;
    return `
      <div class="gc sc" onclick="window.open('${chartUrl}','_blank')">
        <div class="sc-head">
          <div class="sc-logo">${s.symbol.substring(0, 2)}</div>
          <div class="sc-info"><h3>${s.symbol}</h3><div class="cn">${s.name}</div></div>
        </div>
        <div class="mgrid">
          <div class="mi"><span class="ml">P/E</span><span class="mv">${s.pe}</span></div>
          <div class="mi"><span class="ml">P/B</span><span class="mv">${s.pb}</span></div>
          <div class="mi"><span class="ml">EPS Growth</span><span class="mv" style="color:${(s.eps || '').startsWith('+') ? 'var(--green)' : 'var(--red)'}">${s.eps}</span></div>
          <div class="mi"><span class="ml">Revenue YoY</span><span class="mv" style="color:${(s.rev || '').startsWith('+') ? 'var(--green)' : 'var(--red)'}">${s.rev}</span></div>
          <div class="mi"><span class="ml">Margin</span><span class="mv">${s.margin}</span></div>
          <div class="mi"><span class="ml">D/E</span><span class="mv">${s.debt}</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem;">
          <span class="stars">${stars}</span>
          <span class="stag">${s.sector}</span>
        </div>
        <div class="tbar"><div class="tbar-fill ${isUp ? 'up' : 'down'}" style="width:${barPct}%"></div></div>
        <div class="tbar-lbl">
          <span>Current: ${cur}${s.current}</span>
          <span>Target: ${cur}${s.target} (${isUp ? '+' : ''}${upside}%)</span>
        </div>
      </div>`;
  }).join('');
}

// ── GURU TAB ──────────────────────────────────────────────────────────────────
function renderGuruTab() {
  const el = document.getElementById('guru-scroll');
  if (!el) return;
  el.innerHTML = GURU_DATA.map(g => `
    <div class="gc guru-c" style="background:${g.bg};">
      <div class="guru-hdr">
        <div class="guru-av">${g.emoji}</div>
        <div><div class="guru-nm">${g.name}</div><div class="guru-fn">${g.fund}</div></div>
      </div>
      <ul class="guru-list">
        ${g.holdings.map(h => `
          <li class="guru-li">
            <span class="h-tk">${h.ticker}</span>
            <span class="h-pct">${h.pct}</span>
            <span class="h-ch ${h.type}">${h.change}</span>
          </li>`).join('')}
      </ul>
      <div class="guru-ft">
        <span>Updated: ${g.updated}</span>
        <a href="${g.link}" target="_blank" rel="noopener">Full Portfolio →</a>
      </div>
    </div>`).join('');
}

// ── NEWS TICKER ───────────────────────────────────────────────────────────────
function renderNewsTicker(items) {
  const el = document.getElementById('ttrack');
  if (!el) return;
  const doubled = [...items, ...items];
  el.innerHTML = doubled.map(t => `
    <span class="ticker-item">
      <span class="ts">${t.symbol}</span>${t.text}
    </span>`).join('');
}

// ── NEWS FILTER ───────────────────────────────────────────────────────────────
function initNewsFilters() {
  document.querySelectorAll('.nfb').forEach(btn => {
    btn.addEventListener('click', () => {
      currentNewsFilter = btn.dataset.f;
      document.querySelectorAll('.nfb').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      renderNewsTab();
    });
  });
}

// ── NEWS TAB ──────────────────────────────────────────────────────────────────
function renderNewsTab() {
  const el = document.getElementById('ngrid');
  if (!el) return;
  const filtered = currentNewsFilter === 'all'
    ? NEWS_DATA
    : NEWS_DATA.filter(n => n.category === currentNewsFilter);
  el.innerHTML = filtered.map(n => {
    const sc = n.sentiment === 'positive' ? 'pos' : n.sentiment === 'negative' ? 'neg' : 'neu';
    const si = n.sentiment === 'positive' ? '🟢 Positive' : n.sentiment === 'negative' ? '🔴 Negative' : '🟡 Neutral';
    return `
      <div class="gc nc">
        <div class="nc-head"><span class="nc-src">${n.source}</span><span class="nc-time">${n.time}</span></div>
        <div class="nc-hl"><a href="${n.url}" target="_blank" rel="noopener">${n.headline}</a></div>
        <div class="nc-ft">
          <span class="sbdg ${sc}">${si}</span>
          <div class="ntags">${n.tags.map(t => `<span class="ntag">${t}</span>`).join('')}</div>
        </div>
      </div>`;
  }).join('');
}

// ── HERO NEWS ─────────────────────────────────────────────────────────────────
function renderHeroNews() {
  const list = document.getElementById('hero-news-list');
  if (!list) return;
  list.innerHTML = NEWS_DATA.slice(0, 4).map(n => `
    <a class="hn-item" href="${n.url}" target="_blank" rel="noopener">
      <div class="hn-body">
        <h4>${n.headline}</h4>
        <div class="hn-meta"><span class="src">${n.source}</span><span>·</span><span>${n.time}</span></div>
      </div>
    </a>`).join('');
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function initModal() {
  const ov = document.getElementById('modal');
  const x = document.getElementById('modal-x');
  if (!ov || !x) return;
  x.addEventListener('click', closeModal);
  ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
function closeModal() {
  const ov = document.getElementById('modal');
  const bd = document.getElementById('modal-bd');
  if (ov) ov.classList.remove('on');
  document.body.style.overflow = '';
  setTimeout(() => { if (bd) bd.innerHTML = ''; }, 350);
}

// ── GO TOP ────────────────────────────────────────────────────────────────────
function initGoTopButton() {
  const btn = document.getElementById('go-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('vis', scrollY > 400));
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}
