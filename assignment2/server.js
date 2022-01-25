const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;
const fs = require('fs');

app.use(express.urlencoded({ extended: false })); // Converts form data to JSON data
app.use(express.json());

// Handles GET Request
router.get('/todo', (req, res) => {
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  res.status(200).send(data);
});

// Handles POST Request
router.post('/todo', (req, res) => {
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  data.push({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });

  const newData = JSON.stringify(data);
  fs.writeFile('data.json', newData, (err) => {
    if (err) throw err;
    console.log('New data added');
  });
  res.status(200).send(data);
});

// Handles DELETE Request
router.delete('/todo/:title', (req, res) => {
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  const title = req.params.title;
  let index = data.findIndex((i) => i.title === title);

  // Runs if the title is present in the json file.
  if (index !== -1) {
    console.log('running');
    data.splice(index, 1);
    const newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
      console.log('Data deleted');
    });
  }
  res.status(200).send(data);
});

// Handles PUT Request
router.put('/todo', (req, res) => {
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  let index = data.findIndex((i) => i.title === req.body.title);

  // Runs if the title is present in the json file.
  if (index !== -1) {
    data[index].description = req.body.description;
    data[index].status = req.body.status;
    const newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
      console.log('Data updated');
    });
  }
  res.status(200).send(data);
});

app.use('/', router);

app.listen(port, () => {
  console.log('Server running at port ' + port);
});
