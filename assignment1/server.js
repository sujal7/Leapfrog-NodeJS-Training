const http = require('http');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }

  if (req.url == '/login') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write('Welcome');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is running at ${port} port.`);
});
