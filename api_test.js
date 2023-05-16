const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { ifError } = require("assert");
const { json } = require("body-parser");
app.use(express.json());
app.use(json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.get('/get', (req, res) => {
  console.log("It's Working!");
  res.json({ "message": "It's Working!" });
  res.end();
})

app.get('/post', (req, res) => {
  console.log(req.body);
  res.json(req.body);
  res.end();
})

app.get('/patch', (req, res) => {
  console.log("Patch Request Working!");
  res.json(req.body);
  res.end();
})

app.delete('/', (req, res) => {
  console.log("Delete Request Working!");
  res.json(req.body);
  res.end();
})

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is running on port :' + PORT);
  }
});
