// Imports express module.
const express = require('express');

// Initalizes express.
const app = express();

// Port for our server.
const port = 3000;

// Handles get request with '/' mapping i.e. http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hi there. This is the response.');
});

const data = {
  name: 'Pizza',
  price: 350,
  type: ['Cheese', 'Chicken', 'Sausage'],
};

// Handles get request with '/api/food' mapping.
app.get('/api/food', (req, res) => {
  res.send(JSON.stringify(data));
});

// app.post('/', (req, res) => {
//   res.send('POST Request.');
// });

// app.put('/', (req, res) => {
//   res.send('PUT Request.');
// });

// app.delete('/', (req, res) => {
//   res.send('DELETE Request.');
// });

// Server listens to request in the given port.
app.listen(port, () => {
  console.log('Server ready');
});
