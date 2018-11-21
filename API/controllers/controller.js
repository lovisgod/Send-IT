import * as models from '../models';
import * as checks from '../check';
import validateparcels from '../validator/validator';

export const postuser = (req, res) => {
  const user = {
    userid: req.body.userid,
    name: req.body.name,
  };
  models.users.push(user);
  res.status(200).send(user);
};

export const postparcels = (req, res) => {
  const { error } = validateparcels(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const parcel = {
    parcelid: models.parcels.length + 1,
    Name: req.body.Name,
    Pickup: req.body.Pickup,
    Destination: req.body.Destination,
    Reciever: req.body.Reciever,
    userid: req.body.userid,
    RecieverMail: req.body.RecieverMail,
    status: req.body.status,
    Weight: req.body.Weight,
    date: Date.now(),
  };
  models.parcels.push(parcel);
  res.status(200).send(parcel);
};

export const getparcels = (req, res) => {
  res.status(200).send(models.parcels);
};

export const getparcelswithid = (req, res) => {
  // eslint-disable-next-line radix
  const gettheparcels = models.parcels.filter(c => c.parcelid === parseInt(req.params.parcelid));

  if (!gettheparcels) {
    res.status(400).send('the parcel with the giving id is not available');
  } else {
    res.status(200).send(gettheparcels);
  }
};
// this api endpoint for the user order history
export const getparcelsforuser = (req, res) => {
  // this is to check if the user have any parcel
  const userParcels = checks.getUserParcels(req.params.userid);
  const getuser = models.users.filter(c => c.userid === req.params.userid);
  if (!getuser) {
    res.status(404).send('the user with that id is not available');
  } else {
    res.status(200).send({
      // this send the user details as a json object
      user: getuser,
      parcels: userParcels,
      number: userParcels.length,
    });
  }
};

export const canceltheorder = (req, res) => {
  // eslint-disable-next-line radix
  const parcelToCancel = models.parcels.find(c => c.parcelid === parseInt(req.params.parcelid));
  if (!parcelToCancel) {
    res.status(400).send('Nothing to cancel');
  } else {
    if (parcelToCancel.status !== 'delivered') {
      parcelToCancel.status = 'cancelled';
      res.status(200).send('you have successfully cancelled the delivery order');
    }
    res.send({ status: 'You cant cancel an already delivered order!!!' });
  }
};
