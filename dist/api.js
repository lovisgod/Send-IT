'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());

app.use('/static', _express2.default.static('public'));

app.get('/', function (req, res) {
  res.sendFile((0, _path.join)(__dirname + '/../index.html'));
});

// create a non persistence database for parcels

var parcels = [];

// create a non persistence database for users
var users = [];

// eslint-disable-next-line prefer-destructuring
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('listening on port 8000....... please wait');
});

var getUserParcels = function getUserParcels(userId) {
  // eslint-disable-next-line no-use-before-define
  var getid = parcels.find(function (c) {
    return c.userid === userId;
  });
  console.log(getid);
  if (!getid) {
    return 'no parcels for user';
  }
  return getid;
};

app.post('/api/v1/users', function (req, res) {
  var user = {
    userid: req.body.userid,
    name: req.body.name
  };
  users.push(user);
  res.status(200).send(user);
});

app.post('/api/v1/parcels', function (req, res) {
  var parcel = {
    parcelid: parcels.length + 1,
    name: req.body.name,
    reciever: req.body.reciever,
    to: req.body.to,
    from: req.body.from,
    userid: req.body.userid,
    status: req.body.status
  };
  parcels.push(parcel);
  res.status(200).send(parcel);
});

app.get('/api/v1/parcels', function (req, res) {
  res.status(200).send(parcels);
});

app.get('/api/v1/parcels/:parcelid', function (req, res) {
  // eslint-disable-next-line radix
  var getparcels = parcels.find(function (c) {
    return c.parcelid === parseInt(req.params.parcelid);
  });

  if (!getparcels) {
    res.status(400).send('the parcel with the giving id is not available');
  } else {
    res.status(200).send(getparcels);
  }
});

app.get('/api/v1/users/:userid/parcels', function (req, res) {
  var userParcels = getUserParcels(req.params.userid);
  var getuser = users.find(function (c) {
    return c.userid === req.params.userid;
  });
  if (!getuser) {
    res.status(404).send('the user with that id is not available');
  } else {
    res.status(200).send({
      // this send the user details as a json object
      user: getuser,
      parcels: userParcels
    });
  }
});

app.put('/api/v1/parcels/:parcelid/cancel', function (req, res) {
  // eslint-disable-next-line radix
  var parcelToCancel = parcels.find(function (c) {
    return c.parcelid === parseInt(req.params.parcelid);
  });
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