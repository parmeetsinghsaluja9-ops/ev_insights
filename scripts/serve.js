// Minimal local static server (dev only; GitHub Pages serves the same files statically).
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const T = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.csv': 'text/csv', '.md': 'text/plain', '.json': 'application/json', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
const port = process.env.PORT || 8080, root = process.cwd();
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, path.normalize(p));
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}/`));
