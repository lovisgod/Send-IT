import * as models from '../models';
import * as checks from '../check';
import * as valid from '../validator/validator';
import pool from '../database/database';
import harshing from '../bcrypt/bcrypt';


process.on('uncaughtException', (err) => {
  console.error(err);
  console.log('Node NOT Exiting...');
});

export const signupuser = (req, res) => {
  const { error } = valid.validateuser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    userid: req.body.userid,
    password: req.body.password,
  };
  const harsh = harshing.toharsh(user.password);
  pool.connect((err) => {
    if (err) {
      return res.status(404).send('error fetching client from pool', err);
    }
    pool.query('INSERT INTO "Users"("FirstName", "LastName", "userid", "password") VALUES($1, $2, $3, $4)',
      [user.FirstName, user.LastName, user.userid, harsh]);
    res.status(200).send('You have Successfully Signed Up');
    pool.end();
  });
};

export const loginuser = (req, res) => {
  const { error } = valid.validateuserlogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { userid, password } = req.body;

  pool.query('SELECT * FROM "Users" WHERE userid = $1',
    [userid], (err, result) => {
      if (err) {
        return res.status(401).send('Bad requeest');
      }
      if (result) {
        const harsh = result.rows[0].password;
        const istrue = harshing.checkharsh(password, harsh);
        res.send('You are successfuly logged in');
        return istrue;
      }
      return res.status(401).json({ failed: 'Unauthorized Access' });
    });
};

export const postparcels = (req, res) => {
  const { error } = valid.validateparcels(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const parcel = {
    Name: req.body.Name,
    Pickup: req.body.Pickup,
    Destination: req.body.Destination,
    Reciever: req.body.Reciever,
    userid: req.body.userid,
    RecieverMail: req.body.RecieverMail,
    Weight: req.body.Weight,
    status: req.body.status,
  };
  pool.connect((err) => {
    if (err) {
      res.status(404).send('error fetching client from pool', err);
    }
    pool.query(
      'INSERT INTO "Parcels"("Name", "Pickup", "Destination", "Reciever", "userid", "RecieverMail", "Weight", "status") VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [parcel.Name, parcel.Pickup, parcel.Destination, parcel.Reciever, parcel.userid,
        parcel.RecieverMail, parcel.Weight, parcel.status]
    );
    res.status(200).send('Parcel Added');
    pool.end();
  });
};

export const getparcels = (req, res) => {
  pool.connect((err) => {
    if (err) {
      res.status(404).send('error fetching client from pool', err);
    }
    pool.query('SELECT * FROM "Parcels"', (err, response) => {
      if (err) {
        res.status(404).send('error running query', err);
      }
      res.status(200).send(response.rows);
      pool.end();
    });
  });
};


export const getparcelswithid = (req, res) => {
  const gettheparcels = models.parcels.filter(c => c.parcelid
    === parseInt(req.params.parcelid, 10));
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
  const parcelToCancel = models.parcels.find(c => c.parcelid === parseInt(req.params.parcelid, 10));
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

export const changedestination = (req, res) => {
  const id = parseInt(req.params.parcelid, 10);
  const { Destination } = req.body;

  pool.connect((err) => {
    if (err) {
      res.status(404).send('error fetching client from pool', err);
    }
    pool.query('UPDATE "Parcels" SET "Destination" =$1  WHERE parcelid = $2',
      [Destination, id]);
    res.status(200).send('You have Successfully change your order destination');
    pool.end();
  });
};

export const changeorderstatus = (req, res) => {
  const id = parseInt(req.params.parcelid, 10);
  const { status } = req.body;

  pool.connect((err) => {
    if (err) {
      res.status(404).send('error fetching client from pool', err);
    }
    pool.query('UPDATE "Parcels" SET "status" =$1  WHERE parcelid = $2',
      [status, id]);
    res.status(200).send('Status successfully changed');
    pool.end();
  });
};
