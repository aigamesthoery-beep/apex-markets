// ===== STOCK MARKET DASHBOARD — app.js =====

// ===== DATA =====
const MARKET_DATA = {
  TH: {
    name: 'Thailand',
    flag: '🇹🇭',
    exchange: 'SET / mai',
    timezone: 'ICT (UTC+7)',
    hours: '10:00 – 16:30 ICT',
    mainSymbol: 'SET:SET',
    indices: [
      { name: 'SET Index', symbol: 'SET:SET', value: '1,528.26', change: '+12.40', pct: '+0.88%', up: true },
      { name: 'SET50', symbol: 'SET:SET50', value: '923.17', change: '+8.22', pct: '+0.90%', up: true },
      { name: 'mai Index', symbol: 'SET:MAI', value: '412.68', change: '-3.15', pct: '-0.76%', up: false },
    ],
    technicalPicks: [
      { symbol: 'PTT', name: 'PTT Public Co.', price: '34.50', change: '+2.17%', up: true, rsi: 42, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'AOT', name: 'Airports of Thailand', price: '68.25', change: '+1.48%', up: true, rsi: 55, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'ADVANC', name: 'Advanced Info Service', price: '228.00', change: '-0.44%', up: false, rsi: 62, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'KBANK', name: 'Kasikornbank', price: '142.50', change: '+1.07%', up: true, rsi: 38, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'SCB', name: 'SCB X Public Co.', price: '98.75', change: '-1.25%', up: false, rsi: 28, rsiLabel: 'Oversold', macd: 'Bearish Crossover', trend: 'Bearish', signal: 'SELL' },
      { symbol: 'CPALL', name: 'CP ALL Public Co.', price: '62.00', change: '+0.81%', up: true, rsi: 51, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'GULF', name: 'Gulf Energy Dev.', price: '42.25', change: '+3.05%', up: true, rsi: 68, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'BDMS', name: 'Bangkok Dusit Medical', price: '28.75', change: '+0.88%', up: true, rsi: 45, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'TRUE', name: 'True Corporation', price: '11.30', change: '-0.88%', up: false, rsi: 72, rsiLabel: 'Overbought', macd: 'Bearish Crossover', trend: 'Bearish', signal: 'SELL' },
      { symbol: 'BANPU', name: 'Banpu Public Co.', price: '8.95', change: '+1.70%', up: true, rsi: 35, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
    ],
    fundamentalPicks: [
      { symbol: 'PTT', name: 'PTT Public Co.', sector: 'Energy', pe: '9.8', pb: '1.1', eps: '+5.2%', rev: '+8.1%', margin: '6.4%', debt: '0.82', current: '34.50', target: '40.00', stars: 4 },
      { symbol: 'AOT', name: 'Airports of Thailand', sector: 'Transport', pe: '38.2', pb: '7.5', eps: '+45.3%', rev: '+62.1%', margin: '34.2%', debt: '0.35', current: '68.25', target: '75.00', stars: 5 },
      { symbol: 'KBANK', name: 'Kasikornbank', sector: 'Banking', pe: '7.4', pb: '0.7', eps: '+12.1%', rev: '+9.4%', margin: '28.5%', debt: 'N/A', current: '142.50', target: '170.00', stars: 4 },
      { symbol: 'CPALL', name: 'CP ALL Public Co.', sector: 'Retail', pe: '25.6', pb: '6.8', eps: '+8.9%', rev: '+7.2%', margin: '3.1%', debt: '1.45', current: '62.00', target: '68.00', stars: 3 },
      { symbol: 'GULF', name: 'Gulf Energy Dev.', sector: 'Energy', pe: '22.1', pb: '4.2', eps: '+18.5%', rev: '+24.3%', margin: '18.7%', debt: '1.65', current: '42.25', target: '50.00', stars: 4 },
      { symbol: 'ADVANC', name: 'Advanced Info Service', sector: 'Telecom', pe: '22.8', pb: '9.1', eps: '+6.7%', rev: '+4.5%', margin: '15.3%', debt: '0.91', current: '228.00', target: '245.00', stars: 4 },
      { symbol: 'BDMS', name: 'Bangkok Dusit Medical', sector: 'Healthcare', pe: '32.4', pb: '5.6', eps: '+11.2%', rev: '+13.8%', margin: '12.5%', debt: '0.42', current: '28.75', target: '33.00', stars: 4 },
      { symbol: 'SCC', name: 'Siam Cement', sector: 'Materials', pe: '14.2', pb: '1.3', eps: '+3.1%', rev: '+2.8%', margin: '8.6%', debt: '0.78', current: '310.00', target: '350.00', stars: 3 },
      { symbol: 'MINT', name: 'Minor International', sector: 'Hospitality', pe: '28.9', pb: '3.2', eps: '+22.4%', rev: '+19.6%', margin: '9.8%', debt: '1.38', current: '35.00', target: '42.00', stars: 4 },
      { symbol: 'SCB', name: 'SCB X Public Co.', sector: 'Banking', pe: '8.1', pb: '0.9', eps: '+9.5%', rev: '+7.8%', margin: '26.3%', debt: 'N/A', current: '98.75', target: '120.00', stars: 3 },
    ],
  },
  US: {
    name: 'USA',
    flag: '🇺🇸',
    exchange: 'NYSE / NASDAQ',
    timezone: 'ET (UTC-5)',
    hours: '09:30 – 16:00 ET / 21:30 – 03:00 ICT',
    mainSymbol: 'OANDA:SPX500USD',
    indices: [
      { name: 'S&P 500', symbol: 'FOREXCOM:SPXUSD', value: '5,983.25', change: '+42.18', pct: '+0.71%', up: true },
      { name: 'NASDAQ', symbol: 'NASDAQ:NDX', value: '21,245.80', change: '+185.40', pct: '+0.88%', up: true },
      { name: 'Dow Jones', symbol: 'DJ:DJI', value: '43,870.35', change: '-55.20', pct: '-0.13%', up: false },
    ],
    technicalPicks: [
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '878.35', change: '+4.25%', up: true, rsi: 72, rsiLabel: 'Overbought', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'AAPL', name: 'Apple Inc.', price: '232.80', change: '+0.95%', up: true, rsi: 55, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'TSLA', name: 'Tesla, Inc.', price: '342.50', change: '-2.15%', up: false, rsi: 38, rsiLabel: 'Neutral', macd: 'Bearish Crossover', trend: 'Bearish', signal: 'SELL' },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '205.90', change: '+1.32%', up: true, rsi: 58, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: '432.15', change: '+0.68%', up: true, rsi: 50, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'META', name: 'Meta Platforms', price: '585.20', change: '+2.44%', up: true, rsi: 65, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '178.40', change: '+1.15%', up: true, rsi: 52, rsiLabel: 'Neutral', macd: 'Neutral', trend: 'Bullish', signal: 'HOLD' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: '168.75', change: '+3.82%', up: true, rsi: 68, rsiLabel: 'Neutral', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: '895.60', change: '-0.42%', up: false, rsi: 74, rsiLabel: 'Overbought', macd: 'Bearish Crossover', trend: 'Bearish', signal: 'SELL' },
      { symbol: 'PLTR', name: 'Palantir Technologies', price: '78.30', change: '+5.10%', up: true, rsi: 80, rsiLabel: 'Overbought', macd: 'Bullish Crossover', trend: 'Bullish', signal: 'BUY' },
    ],
    fundamentalPicks: [
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', pe: '30.5', pb: '48.2', eps: '+9.2%', rev: '+5.1%', margin: '26.3%', debt: '1.76', current: '232.80', target: '255.00', stars: 5 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', pe: '36.8', pb: '12.1', eps: '+14.8%', rev: '+12.5%', margin: '36.4%', debt: '0.42', current: '432.15', target: '480.00', stars: 5 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', pe: '24.2', pb: '6.8', eps: '+28.5%', rev: '+15.2%', margin: '27.5%', debt: '0.06', current: '178.40', target: '200.00', stars: 5 },
      { symbol: 'AMZN', name: 'Amazon.com, Inc.', sector: 'E-Commerce', pe: '42.5', pb: '8.2', eps: '+55.3%', rev: '+12.8%', margin: '8.1%', debt: '0.58', current: '205.90', target: '230.00', stars: 4 },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Semiconductors', pe: '65.2', pb: '42.8', eps: '+168.5%', rev: '+122.4%', margin: '55.8%', debt: '0.41', current: '878.35', target: '950.00', stars: 4 },
      { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', pe: '28.4', pb: '8.5', eps: '+73.2%', rev: '+24.8%', margin: '35.2%', debt: '0.28', current: '585.20', target: '620.00', stars: 4 },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Conglomerate', pe: '10.2', pb: '1.5', eps: '+21.4%', rev: '+8.6%', margin: '15.8%', debt: '0.26', current: '445.20', target: '480.00', stars: 5 },
      { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', pe: '15.8', pb: '5.2', eps: '+4.2%', rev: '+3.8%', margin: '22.1%', debt: '0.52', current: '155.80', target: '175.00', stars: 4 },
      { symbol: 'V', name: 'Visa Inc.', sector: 'Financials', pe: '32.1', pb: '14.5', eps: '+15.5%', rev: '+10.2%', margin: '54.8%', debt: '0.82', current: '292.50', target: '320.00', stars: 5 },
      { symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', pe: '20.5', pb: '6.1', eps: '+12.8%', rev: '+8.5%', margin: '8.2%', debt: '0.68', current: '528.40', target: '580.00', stars: 4 },
    ],
  }
};

// Guru Holdings data
const GURU_DATA = [
  {
    id: 'buffett',
    name: 'Warren Buffett',
    fund: 'Berkshire Hathaway',
    emoji: '🎩',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04))',
    updated: 'Q4 2025 (13F Filing)',
    link: '#',
    holdings: [
      { ticker: 'AAPL', pct: '28.1%', change: 'Reduced', type: 'reduced' },
      { ticker: 'BAC', pct: '12.4%', change: 'Held', type: 'added' },
      { ticker: 'AXP', pct: '10.8%', change: 'Held', type: 'added' },
      { ticker: 'KO', pct: '8.5%', change: 'Held', type: 'added' },
      { ticker: 'CVX', pct: '6.2%', change: 'Added', type: 'added' },
    ]
  },
  {
    id: 'munger',
    name: 'Charlie Munger',
    fund: 'Legacy Portfolio (DJCO)',
    emoji: '🦅',
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.04))',
    updated: 'Final 13F Filing',
    link: '#',
    holdings: [
      { ticker: 'BAC', pct: '48.2%', change: 'Held', type: 'added' },
      { ticker: 'WFC', pct: '18.5%', change: 'Held', type: 'added' },
      { ticker: 'BABA', pct: '15.3%', change: 'Held', type: 'reduced' },
      { ticker: 'USB', pct: '10.8%', change: 'Held', type: 'added' },
      { ticker: 'POSCO', pct: '7.2%', change: 'Held', type: 'added' },
    ]
  },
  {
    id: 'dalio',
    name: 'Ray Dalio',
    fund: 'Bridgewater Associates',
    emoji: '🌊',
    bg: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.04))',
    updated: 'Q4 2025 (13F Filing)',
    link: '#',
    holdings: [
      { ticker: 'SPY', pct: '8.5%', change: 'Added', type: 'added' },
      { ticker: 'IEMG', pct: '7.2%', change: 'Added', type: 'added' },
      { ticker: 'GOOGL', pct: '4.8%', change: 'New', type: 'new' },
      { ticker: 'NVDA', pct: '3.5%', change: 'Added', type: 'added' },
      { ticker: 'PG', pct: '3.1%', change: 'Reduced', type: 'reduced' },
    ]
  },
  {
    id: 'wood',
    name: 'Cathie Wood',
    fund: 'ARK Invest',
    emoji: '🔥',
    bg: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.04))',
    updated: 'Feb 2026',
    link: '#',
    holdings: [
      { ticker: 'TSLA', pct: '11.2%', change: 'Added', type: 'added' },
      { ticker: 'COIN', pct: '7.8%', change: 'Added', type: 'added' },
      { ticker: 'ROKU', pct: '6.5%', change: 'Held', type: 'added' },
      { ticker: 'PLTR', pct: '5.2%', change: 'New', type: 'new' },
      { ticker: 'SQ', pct: '4.8%', change: 'Added', type: 'added' },
    ]
  },
  {
    id: 'lynch',
    name: 'Peter Lynch',
    fund: 'Lynch-Style Picks',
    emoji: '🧮',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.04))',
    updated: 'Growth at Reasonable Price',
    link: '#',
    holdings: [
      { ticker: 'COST', pct: 'PEG 0.9', change: 'Value', type: 'added' },
      { ticker: 'HD', pct: 'PEG 1.1', change: 'Value', type: 'added' },
      { ticker: 'UNP', pct: 'PEG 1.0', change: 'Growth', type: 'new' },
      { ticker: 'SBUX', pct: 'PEG 0.8', change: 'Value', type: 'added' },
      { ticker: 'DIS', pct: 'PEG 1.2', change: 'Turnaround', type: 'new' },
    ]
  },
];

// News data
const NEWS_DATA = [
  { headline: 'Federal Reserve Signals Potential Rate Cut in Q2 2026 as Inflation Cools', source: 'Reuters', time: '15 min ago', sentiment: 'positive', category: 'usa', tags: ['SPY', 'QQQ', 'TLT'], url: 'https://www.reuters.com/markets/' },
  { headline: 'SET Index Rallies Past 1,400 on Foreign Inflows and Tourism Recovery', source: 'Bangkok Post', time: '32 min ago', sentiment: 'positive', category: 'thailand', tags: ['SET', 'AOT', 'MINT'], url: 'https://www.bangkokpost.com/business' },
  { headline: 'NVIDIA Unveils Next-Gen Blackwell Ultra GPUs, Stock Surges 4%', source: 'CNBC', time: '1 hr ago', sentiment: 'positive', category: 'usa', tags: ['NVDA', 'AMD', 'SMCI'], url: 'https://www.cnbc.com/technology/' },
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

// Ticker headlines for the scrolling bar
const TICKER_HEADLINES = [
  { symbol: 'NVDA', text: '+4.25% — Blackwell Ultra GPUs unveiled' },
  { symbol: 'SET', text: '+0.88% — Foreign inflows boost Thai market' },
  { symbol: 'BTC', text: '$105,230 — New all-time high' },
  { symbol: 'AAPL', text: '+0.95% — iPhone 17 AI features confirmed' },
  { symbol: 'TSLA', text: '-2.15% — Q1 deliveries miss estimates' },
  { symbol: 'KBANK', text: '+1.07% — BoT holds rate steady' },
  { symbol: 'META', text: '+2.44% — AI assistant hits 1B users' },
  { symbol: 'PTT', text: '+2.17% — Energy sector rallies on earnings' },
];

// ===== STATE =====
let currentMarket = localStorage.getItem('selectedMarket') || 'TH';
let currentTab = 'technical';
let currentNewsFilter = 'all';
let tradingViewWidget = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initMarketToggle();
  initTabs();
  initNewsFilters();
  initGoTopButton();
  initModal();
  renderNewsTicker();
  renderAll();
});

// ===== MARKET TOGGLE =====
function initMarketToggle() {
  const btnTH = document.getElementById('toggle-th');
  const btnUS = document.getElementById('toggle-us');
  const slider = document.getElementById('toggle-slider');

  btnTH.addEventListener('click', () => switchMarket('TH'));
  btnUS.addEventListener('click', () => switchMarket('US'));

  updateToggleUI();
}

function switchMarket(market) {
  currentMarket = market;
  localStorage.setItem('selectedMarket', market);
  updateToggleUI();
  renderAll();
}

function updateToggleUI() {
  const btnTH = document.getElementById('toggle-th');
  const btnUS = document.getElementById('toggle-us');
  const slider = document.getElementById('toggle-slider');

  btnTH.classList.toggle('active', currentMarket === 'TH');
  btnUS.classList.toggle('active', currentMarket === 'US');
  slider.classList.toggle('us', currentMarket === 'US');

  // Update market status
  updateMarketStatus();
}

function updateMarketStatus() {
  const statusEl = document.getElementById('market-status-text');
  const dotEl = document.getElementById('market-status-dot');
  const data = MARKET_DATA[currentMarket];

  // Simple open/closed logic based on current time
  const now = new Date();
  const utcHour = now.getUTCHours();
  let isOpen = false;

  if (currentMarket === 'TH') {
    // SET: 03:00-09:30 UTC (10:00-16:30 ICT)
    isOpen = (utcHour >= 3 && utcHour < 10);
  } else {
    // NYSE: 14:30-21:00 UTC (09:30-16:00 ET)
    isOpen = (utcHour >= 14 && utcHour < 21);
  }

  statusEl.textContent = `${data.flag} ${data.exchange} — ${isOpen ? 'Open' : 'Closed'} · ${data.hours}`;
  dotEl.className = 'status-dot ' + (isOpen ? 'live' : 'closed');
}

// ===== RENDER ALL =====
function renderAll() {
  renderIndexCards();
  renderMainChart();
  renderTechnicalTab();
  renderFundamentalTab();
  renderGuruTab();
  renderNewsTab();
}

// ===== INDEX CARDS =====
function renderIndexCards() {
  const container = document.getElementById('index-cards');
  const data = MARKET_DATA[currentMarket];

  container.innerHTML = data.indices.map(idx => `
    <div class="glass-card index-card">
      <div class="index-name">${idx.name}</div>
      <div class="index-value">${idx.value}</div>
      <div class="index-change ${idx.up ? 'up' : 'down'}">
        ${idx.up ? '▲' : '▼'} ${idx.change} (${idx.pct})
      </div>
    </div>
  `).join('');
}

// ===== MAIN CHART (Overview Link) =====
function renderMainChart() {
  const container = document.getElementById('tradingview-chart');
  const data = MARKET_DATA[currentMarket];
  container.innerHTML = '';

  const widgetDiv = document.createElement('div');
  widgetDiv.style.height = '100%';
  widgetDiv.style.minHeight = '500px';
  widgetDiv.style.display = 'flex';
  widgetDiv.style.justifyContent = 'center';
  widgetDiv.style.alignItems = 'center';
  widgetDiv.style.flexDirection = 'column';
  widgetDiv.style.gap = '1.5rem';

  let chartUrl = currentMarket === 'TH'
    ? 'https://www.settrade.com/th/equities/market-data/overview'
    : 'https://finance.yahoo.com/';

  let provider = currentMarket === 'TH' ? 'Settrade' : 'Yahoo Finance';

  widgetDiv.innerHTML = `
        <div style="font-size:4rem;">📊</div>
        <div style="font-size:1.5rem;font-weight:700;color:var(--txt);">${data.name} Market Overview</div>
        <div style="font-size:1rem;color:var(--txt3);max-width:500px;text-align:center;line-height:1.6;">
            Access real-time interactive charts, level 2 data, and comprehensive market analysis directly on ${provider}.
        </div>
        <a href="${chartUrl}" target="_blank" style="margin-top:1rem;padding:0.75rem 2rem;background:linear-gradient(135deg, var(--accent), var(--cyan));color:white;border-radius:99px;font-weight:700;text-decoration:none;transition:transform 0.2s, box-shadow 0.2s;box-shadow:0 4px 15px rgba(99,102,241,0.3);" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(99,102,241,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(99,102,241,0.3)'">
            Open Market on ${provider} ↗
        </a>
    `;

  container.appendChild(widgetDiv);
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      currentTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
    });
  });
}

// ===== TECHNICAL TAB =====
function renderTechnicalTab() {
  const container = document.getElementById('technical-grid');
  const stocks = MARKET_DATA[currentMarket].technicalPicks;

  container.innerHTML = stocks.map((s, i) => `
    <div class="glass-card stock-card" onclick="openChartModal('${s.symbol}', '${currentMarket === 'TH' ? 'SET' : 'NASDAQ'}')">
      <div class="stock-card-header">
        <div class="stock-logo">${s.symbol.substring(0, 2)}</div>
        <div class="stock-info">
          <h3>${s.symbol}</h3>
          <div class="company-name">${s.name}</div>
        </div>
      </div>
      <div class="stock-price-row">
        <span class="stock-price">${currentMarket === 'TH' ? '฿' : '$'}${s.price}</span>
        <span class="stock-change ${s.up ? 'up' : 'down'}">${s.up ? '▲' : '▼'} ${s.change}</span>
      </div>
      <div class="mini-chart" id="mini-chart-${currentMarket}-${i}">
        ${generateMiniSVG(s.up)}
      </div>
      <div class="badge-row">
        <span class="badge badge-rsi">RSI: ${s.rsi} · ${s.rsiLabel}</span>
        <span class="badge badge-macd">${s.macd === 'Bullish Crossover' ? '↗' : s.macd === 'Bearish Crossover' ? '↘' : '→'} MACD: ${s.macd}</span>
      </div>
      <div class="badge-row">
        <span class="badge ${s.trend === 'Bullish' ? 'badge-trend-up' : 'badge-trend-down'}">
          ${s.trend === 'Bullish' ? '📈' : '📉'} ${s.trend} Trend
        </span>
      </div>
      <div style="margin-top:0.5rem;">
        <span class="signal-badge signal-${s.signal.toLowerCase()}">${s.signal === 'BUY' ? '🟢' : s.signal === 'SELL' ? '🔴' : '🟡'} ${s.signal}</span>
      </div>
    </div>
  `).join('');
}

// Generate a mini SVG sparkline
function generateMiniSVG(isUp) {
  const points = [];
  let y = 30;
  for (let i = 0; i <= 20; i++) {
    y += (Math.random() - (isUp ? 0.4 : 0.6)) * 8;
    y = Math.max(5, Math.min(55, y));
    points.push(`${i * 15},${y}`);
  }
  const color = isUp ? '#10b981' : '#ef4444';
  const gradientId = `grad-${Math.random().toString(36).substr(2, 6)}`;
  return `
    <svg viewBox="0 0 300 60" preserveAspectRatio="none" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="0,60 ${points.join(' ')} 300,60" fill="url(#${gradientId})" />
      <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

// ===== FUNDAMENTAL TAB =====
function renderFundamentalTab() {
  const container = document.getElementById('fundamental-grid');
  const stocks = MARKET_DATA[currentMarket].fundamentalPicks;

  container.innerHTML = stocks.map(s => {
    const currentPrice = parseFloat(s.current.replace(',', ''));
    const targetPrice = parseFloat(s.target.replace(',', ''));
    const upside = ((targetPrice - currentPrice) / currentPrice * 100).toFixed(1);
    const barPct = Math.min(100, (currentPrice / targetPrice) * 100);
    const isUpside = targetPrice > currentPrice;
    const stars = '★'.repeat(s.stars) + '☆'.repeat(5 - s.stars);

    return `
      <div class="glass-card stock-card" onclick="openChartModal('${s.symbol}', '${currentMarket === 'TH' ? 'SET' : 'NASDAQ'}')">
        <div class="stock-card-header">
          <div class="stock-logo">${s.symbol.substring(0, 2)}</div>
          <div class="stock-info">
            <h3>${s.symbol}</h3>
            <div class="company-name">${s.name}</div>
          </div>
        </div>
        <div class="metric-grid">
          <div class="metric-item"><span class="metric-label">P/E Ratio</span><span class="metric-value">${s.pe}</span></div>
          <div class="metric-item"><span class="metric-label">P/B Ratio</span><span class="metric-value">${s.pb}</span></div>
          <div class="metric-item"><span class="metric-label">EPS Growth</span><span class="metric-value" style="color:${s.eps.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)'}">${s.eps}</span></div>
          <div class="metric-item"><span class="metric-label">Revenue YoY</span><span class="metric-value" style="color:${s.rev.startsWith('+') ? 'var(--accent-green)' : 'var(--accent-red)'}">${s.rev}</span></div>
          <div class="metric-item"><span class="metric-label">Profit Margin</span><span class="metric-value">${s.margin}</span></div>
          <div class="metric-item"><span class="metric-label">Debt/Equity</span><span class="metric-value">${s.debt}</span></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
          <span class="star-rating">${stars}</span>
          <span class="sector-tag">${s.sector}</span>
        </div>
        <div class="target-bar"><div class="target-bar-fill ${isUpside ? 'upside' : 'downside'}" style="width:${barPct}%"></div></div>
        <div class="target-labels">
          <span>Current: ${currentMarket === 'TH' ? '฿' : '$'}${s.current}</span>
          <span>Target: ${currentMarket === 'TH' ? '฿' : '$'}${s.target} (${isUpside ? '+' : ''}${upside}%)</span>
        </div>
      </div>
    `;
  }).join('');
}

// ===== GURU TAB =====
function renderGuruTab() {
  const container = document.getElementById('guru-scroll');

  container.innerHTML = GURU_DATA.map(g => `
    <div class="glass-card guru-card" style="background:${g.bg};">
      <div class="guru-header">
        <div class="guru-avatar">${g.emoji}</div>
        <div>
          <div class="guru-name">${g.name}</div>
          <div class="guru-fund">${g.fund}</div>
        </div>
      </div>
      <ul class="guru-holdings-list">
        ${g.holdings.map(h => `
          <li class="guru-holding-item">
            <span class="holding-ticker">${h.ticker}</span>
            <span class="holding-pct">${h.pct}</span>
            <span class="holding-change ${h.type}">${h.change}</span>
          </li>
        `).join('')}
      </ul>
      <div class="guru-footer">
        <span>Updated: ${g.updated}</span>
        <a href="${g.link}">Full Portfolio →</a>
      </div>
    </div>
  `).join('');
}

// ===== NEWS TICKER =====
function renderNewsTicker() {
  const track = document.getElementById('ticker-track');
  // Duplicate for seamless loop
  const items = [...TICKER_HEADLINES, ...TICKER_HEADLINES].map(t => `
    <span class="ticker-item">
      <span class="ticker-symbol">${t.symbol}</span>
      ${t.text}
    </span>
  `).join('');
  track.innerHTML = items;
}

// ===== NEWS TAB =====
function initNewsFilters() {
  document.querySelectorAll('.news-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentNewsFilter = btn.dataset.filter;
      document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNewsTab();
    });
  });
}

function renderNewsTab() {
  const container = document.getElementById('news-grid');
  let filtered = NEWS_DATA;

  if (currentNewsFilter !== 'all') {
    filtered = NEWS_DATA.filter(n => n.category === currentNewsFilter);
  }

  container.innerHTML = filtered.map(n => `
    <div class="glass-card news-card">
      <div class="news-card-header">
        <span class="news-source">${n.source}</span>
        <span class="news-time">${n.time}</span>
      </div>
      <div class="news-headline"><a href="${n.url}" target="_blank">${n.headline}</a></div>
      <div class="news-footer">
        <span class="sentiment-badge sentiment-${n.sentiment}">
          ${n.sentiment === 'positive' ? '🟢 Positive' : n.sentiment === 'negative' ? '🔴 Negative' : '🟡 Neutral'}
        </span>
        <div class="news-tags">
          ${n.tags.map(t => `<span class="news-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ===== MODAL =====
function initModal() {
  const overlay = document.getElementById('chart-modal');
  const closeBtn = document.getElementById('modal-close');

  closeBtn.addEventListener('click', closeChartModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeChartModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeChartModal();
  });
}

function openChartModal(symbol, exchange) {
  let url;
  if (exchange === 'SET' || currentMarket === 'TH') {
    url = `https://www.settrade.com/th/equities/quote/${symbol}/overview`;
  } else {
    url = `https://finance.yahoo.com/quote/${symbol}`;
  }
  window.open(url, '_blank');
}

function closeChartModal() {
  const overlay = document.getElementById('chart-modal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';

  setTimeout(() => {
    document.getElementById('modal-chart-body').innerHTML = '';
  }, 350);
}

// ===== GO TO TOP =====
function initGoTopButton() {
  const btn = document.getElementById('go-top-btn');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
