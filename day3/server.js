const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

// app.use(bodyParser.json());

// This is working for Postman request.
// app.use(express.json());

// This is working for form input.
// app.use(express.urlencoded({ extended: true }));

// Works for both postman and form
app.use(express.urlencoded({ extended: false })); // Converts form data to JSON data
app.use(express.json());

// The following code is mostly in Client side: using React, Vue
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Using Router of express
router.post('/login', (req, res) => {
  console.log(req.body);

  const email = 'ram@gmail.com';
  const password = 'ram';

  if (req.body.email === email && req.body.password === password) {
    console.log('Success');
    // res.send(req.body);
    let data = {};
    if (req.body.email === 'ram@gmail.com') {
      data = { username: 'ram', friends: ['gita', 'shyam'] };

      // Sets status code and sends the data
      res.status(200).send(data);
    }
  } else {
    console.log('fail');
    res.status(500).send('fail');
  }
  // res.send('login successful');
});

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
