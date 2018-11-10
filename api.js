/* eslint-disable no-unused-vars */


const express = require('express');

const app = express();
app.use(express.json());
const path = require('path');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// create a non persistence database for parcels

const parcels = [

];

// create a non persistence database for users
const users = [

];

// eslint-disable-next-line prefer-destructuring
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port 5000....... please wait');
});

const getUserParcels = (userId) => {
  // eslint-disable-next-line no-use-before-define
  const getid = parcels.find(c => c.userid === userId);
  console.log(getid);
  if (!getid) {
    return 'no parcels for user';
  }
  return getid;
};

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

app.get('/api/v1/parcels', (req, res) => {
  res.status(200).send(parcels);
});

app.get('/api/v1/parcels/:parcelid', (req, res) => {
  // eslint-disable-next-line radix
  const getparcels = parcels.find(c => c.parcelid === parseInt(req.params.parcelid));

  if (!getparcels) {
    res.status(400).send('the parcel with the giving id is not available');
  } else {
    res.status(200).send(getparcels);
  }
});

app.get('/api/v1/users/:userid/parcels', (req, res) => {
  const userParcels = getUserParcels(req.params.userid);
  const getuser = users.find(c => c.userid === req.params.userid);
  if (!getuser) {
    res.status(404).send('the user with that id is not available');
  } else {
    res.status(200).send({
      // this send the user details as a json object
      user: getuser,
      parcels: userParcels,
    });
  }
});

app.put('/api/v1/parcels/:parcelid/cancel', (req, res) => {
  // eslint-disable-next-line radix
  const parcelToCancel = parcels.find(c => c.parcelid === parseInt(req.params.parcelid));
  if (!parcelToCancel) {
    res.status(400).send('Nothing to cancel');
  } else {
    if (parcelToCancel.status !== 'delivered') {
      parcelToCancel.status = 'cancelled';
      res.status(200).send('you have successfully cancelled the delivery order');
    }
    res.send({ status: 'You cant cancel an already delivered order!!!' });
  }
});

module.exports = PORT;
