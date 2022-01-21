const http = require('http');
const dt = require('./dateTime');
const url = require('url');

const fs = require('fs');

// port is assigned to process.env.PORT if present, else 3000.
// process.env.PORT is environment variable, it changes depending on environment:
// i.e. development, staging and production.
const port = process.env.PORT || 3000;

// Goes to '/' path by default
const server = http.createServer((req, res) => {
  // Sends the HTML file as response.
  fs.readFile('demofile.html', function (err, data) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(data);
    return res.end();
  });

  // // Gets request url from browser.
  // console.log(req.url);

  // // Gets query string.
  // const test = url.parse(req.url).query;
  // console.log(test);

  // // Sets response type. 200 is status code.
  // // res.writeHead(200, { 'Content-type': 'text/html' });

  // res.writeHead(200, { 'Content-type': 'application/json' });

  // // res.write('<h1>Hello World</h1>');

  // // Converts string to JSON Type
  // // res.write(JSON.stringify('Hello World'));

  // // We can also pass array to stringify.
  // res.write(JSON.stringify(['apple', 'banana']));

  // // We can also pass object to stringify.

  // res.end();
});

server.listen(port, () => {
  console.log(dt.myDateTime());
  console.log(`Server running at port ${port}`);
});

// Assignment
// Make a form of login page.
// Submit - keep some URL.
