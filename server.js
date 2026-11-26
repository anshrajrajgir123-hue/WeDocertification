const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURI(req.url.split('?')[0]);

  // Version polling endpoint for automatic live-reload
  if (reqUrl === '/api/version' || reqUrl === '/version') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    const indexPath = path.join(BASE_DIR, 'index.html');
    try {
      const stats = fs.statSync(indexPath);
      res.end(stats.mtimeMs.toString());
    } catch (e) {
      res.end(Date.now().toString());
    }
    return;
  }

  // Normalize root and clean routes
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  } else if (reqUrl === '/blog' || reqUrl === '/blogs') {
    reqUrl = '/blogs.html';
  }

  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(BASE_DIR, safePath);

  // Check if direct file exists, or if appending .html works (for clean URLs)
  let finalPath = filePath;
  if (!fs.existsSync(finalPath) || fs.statSync(finalPath).isDirectory()) {
    if (fs.existsSync(finalPath + '.html')) {
      finalPath = finalPath + '.html';
    } else if (fs.existsSync(path.join(finalPath, 'index.html'))) {
      finalPath = path.join(finalPath, 'index.html');
    }
  }

  fs.stat(finalPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache'
      });
      res.end('404 Not Found: ' + reqUrl);
      return;
    }

    const ext = path.extname(finalPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Strict no-cache headers so browser always sees latest edits
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const stream = fs.createReadStream(finalPath);
    stream.pipe(res);
    stream.on('error', () => {
      res.writeHead(500);
      res.end('Server Error');
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`WeDo Website Server running at:`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Network: http://127.0.0.1:${PORT}/`);
  console.log(`Serving: ${BASE_DIR}`);
});
