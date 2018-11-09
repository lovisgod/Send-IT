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

app.post('/api/v1/parcels', (req, res) => {
  const parcel = {
    parcelid: parcels.length + 1,
    name: req.body.name,
    reciever: req.body.reciever,
    to: req.body.to,
    from: req.body.from,
    userid: req.body.userid,
    status: req.body.status,
  };
  parcels.push(parcel);
  res.status(200).send(parcel);
});

module.exports = port;
