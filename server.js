/**
 * APEX Markets — Node.js Static Server + Yahoo Finance Proxy
 *
 * GET /api/quotes          → proxies Yahoo Finance Quote API (ไม่ติด CORS)
 * GET /dashboard.html etc. → serve static files
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// ── Yahoo Finance Proxy (60-second cache) ─────────────────────────────────────
let _cache = { data: null, ts: 0 };
const CACHE_TTL = 60_000; // ms

const yahooFinance = require('yahoo-finance2').default;

function fetchYahooQuotes(symbols, cb) {
    // Return cached data if fresh
    if (_cache.data && Date.now() - _cache.ts < CACHE_TTL) {
        return cb(null, _cache.data);
    }

    const symArray = symbols.split(',').map(s => s.trim()).filter(Boolean);
    if (!symArray.length) return cb(new Error('No symbols provided'));

    yahooFinance.quote(symArray).then(results => {
        // yahoo-finance2 returns an array of quote objects, we need to map it back to { quoteResponse: { result: [...] } } format for app.js
        const qmap = results.map(q => ({
            symbol: q.symbol,
            regularMarketPrice: q.regularMarketPrice,
            regularMarketChange: q.regularMarketChange,
            regularMarketChangePercent: q.regularMarketChangePercent
        }));
        const json = { quoteResponse: { result: qmap } };
        _cache = { data: json, ts: Date.now() };
        cb(null, json);
    }).catch(err => {
        cb(new Error('Yahoo proxy error: ' + err.message));
    });
}

// ── Static file types ─────────────────────────────────────────────────────────
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
};

// ── Server ────────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;

    // CORS headers (ให้ browser เรียกซ้ำได้)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // ── /api/quotes  ──────────────────────────────────────────────────────────
    if (pathname === '/api/quotes') {
        const symbols = parsed.query.symbols || '';
        if (!symbols) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'symbols param required' }));
        }

        fetchYahooQuotes(symbols, (err, data) => {
            if (err) {
                console.error('Yahoo proxy error:', err.message);
                res.writeHead(502, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
        return;
    }

    // ── Static files ──────────────────────────────────────────────────────────
    let filePath = '.' + pathname;
    if (filePath === './') filePath = './dashboard.html';

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not found: ' + pathname);
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log('\n========================================');
    console.log('🚀 APEX Markets server running!');
    console.log(`👉 http://localhost:${PORT}/dashboard.html`);
    console.log('📡 Yahoo Finance proxy: /api/quotes');
    console.log('========================================\n');
    require('child_process').exec(`start http://localhost:${PORT}/dashboard.html`);
});
