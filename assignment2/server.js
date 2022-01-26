const express = require('express');
const app = express();
const router = express.Router();
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
    data.splice(index, 1);
    const newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
      console.log('Data deleted');
    });
    res.status(200).send(data);
  } else {
    res.status(500).send('Error');
  }
});

// Handles PUT Request
router.put('/todo/:title', (req, res) => {
  let data = fs.readFileSync('data.json');
  data = JSON.parse(data);
  const title = req.params.title;
  // let index = data.findIndex((i) => i.title === title);

  let indexArray = [];
  // Stores all the index where the title is present.
  for (let i = 0; i < data.length; i++) {
    if (data[i].title === title) {
      indexArray.push(i);
    }
  }

  // Runs if the title is present in the json file.
  if (indexArray.length !== 0) {
    for (let index of indexArray) {
      data[index].description = req.body.description;
      data[index].status = req.body.status;
    }
    const newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, (err) => {
      if (err) throw err;
      console.log('Data updated');
    });
    res.status(200).send(data);
  } else {
    res.status(500).send('Error');
  }
});

app.use('/', router);

app.listen(port, () => {
  console.log('Server running at port ' + port);
});
