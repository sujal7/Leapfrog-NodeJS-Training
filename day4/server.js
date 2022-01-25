const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const fs = require('fs');

// app.use(bodyParser.json());

// This is working for Postman request.
// app.use(express.json());

// This is working for form input.
// app.use(express.urlencoded({ extended: true }));

// Works for both postman and form
app.use(express.urlencoded({ extended: false })); // Converts form data to JSON data
app.use(express.json());

// Middleware
function test(req, res, next) {
  req.name = 'ram';
  console.log('Middleware');
  next();
}

// Runs everytime when there is request.
app.use(test);

// The following code is mostly in Client side: using React, Vue
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Using Router of express
router.post('/login', (req, res) => {
  const email = 'ram@gmail.com';
  const password = 'ram';

  if (req.body.email === email && req.body.password === password) {
    const data = require('./data.json');
    console.log('Success');
    res.status(200).send(data);
  } else {
    console.log('fail');
    res.status(500).send('fail');
  }
});

router.post('/todos', (req, res) => {
  // const data = require('./data.json');

  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  data.push({
    title: title,
    description: description,
    status: status,
  });

  const newData = JSON.stringify(data);
  fs.writeFile('data.json', newData, (err) => {
    if (err) throw err;
    console.log('New data added');
  });
  res.status(200).send(data);
  // res.sendFile(path.join(__dirname, '/display.html'));
});

router.get('/todos', (req, res) => {
  // const data = require('./data.json');
  console.log(req.name);
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  res.status(200).send(data);
});
// router.post('/todos', (req, res) => {
//   res.sendFile(path.join(__dirname, '/display.html'));
// });

// router.get('/todoform', (req, res) => {
//   res.sendFile(path.join(__dirname, '/todo.html'));
// });

// TODO: unique title, /title
router.delete('/todos', (req, res) => {});

// TODO: PUT

router.get('/display', (req, res) => {
  const data = require('./data.json');
});

// router.post('/todoform', (req, res) => {
//   const title = req.body.title;
//   const description = req.body.description;
//   const status = req.body.status;
//   const data = JSON.stringify({
//     title: title,
//     description: description,
//     status: status,
//   });
//   res.send(data);
//   console.log(data);
// });

router.post('/register', (req, res) => {
  res.send('Register successful');
});

router.get('/logout', (req, res) => {
  res.send('Logout successful');
});

// Binding router with app
// here, '/' is default URL.
app.use('/', router);

// Using Express only
// app.get('/check', (req, res) => {
//   res.send('hello');
// });

app.listen(port, () => {
  console.log('Server running at port ' + port);
});
