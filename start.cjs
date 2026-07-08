const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const contentTypeMap = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif',
};
const server = http.createServer((req, res) => {
  let filePath = path.join(dir, req.url === '/' ? 'index.html' : decodeURIComponent(req.url));
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': contentTypeMap[ext] || 'application/octet-stream' });
    res.end(data);
  });
});
server.listen(8080, () => {
  console.log('=====================================');
  console.log('  红钢城H5交互作品已启动!');
  console.log('=====================================\n');
  console.log('请在浏览器中打开: http://localhost:8080\n');
});
