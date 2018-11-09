/* eslint-disable no-unused-vars */


const express = require('express');

const app = express();
app.use(express.json());

// create a non persistence database for parcels

const parcels = [

];

// create a non persistence database for users
const users = [

];

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log('listening on port 8000....... please wait');
});

app.post('/api/v1/users', (req, res) => {
  const user = {
    userid: req.body.userid,
    name: req.body.name,
  };
  users.push(user);
  res.status(200).send(user);
});

module.exports = port;
