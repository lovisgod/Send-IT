import * as valid from '../validator/validator';
import pool from '../database/database';
import harshing from '../bcrypt/bcrypt';

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
    return res.status(200).send('You have Successfully Signed Up');
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
    location: req.body.location,
  };
  pool.connect((err) => {
    if (err) {
      return res.status(404).send('error fetching client from pool', err);
    }
    pool.query(
      'INSERT INTO "Parcels"("Name", "Pickup", "Destination", "Reciever", "userid", "RecieverMail", "Weight", "status", "location" ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [parcel.Name, parcel.Pickup, parcel.Destination, parcel.Reciever, parcel.userid,
        parcel.RecieverMail, parcel.Weight, parcel.status, parcel.location]
    );
    return res.status(200).send('Parcel Added');
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
      return res.status(200).send(response.rows);
    });
  });
};


export const getparcelswithid = (req, res) => {
  const { parcelid } = req.params;
  pool.query('SELECT * FROM "Parcels" WHERE parcelid = $1',
    [parcelid], (err, result) => {
      if (err) {
        return res.status(404).send('the parcel with the giving id is not available');
      }
      if (result) {
        return res.status(200).send(result.rows[0]);
      }
    });
};
// this api endpoint for the user order history
export const getparcelsforuser = (req, res) => {
  // this is to check if the user have any parcel
  const { userid } = req.params;
  pool.query('SELECT * FROM "Parcels" WHERE userid = $1',
    [userid], (err, result) => {
      if (err) {
        return res.status(404).send('NO PARCEL AVAILABLE FOR USER');
      }
      if (result) {
        return res.status(200).send(result.rows);
      }
    });
};

export const canceltheorder = (req, res) => {
  const { parcelid } = req.params;
  pool.query('SELECT * FROM "Parcels" WHERE parcelid = $1',
    [parcelid], (err, result) => {
      if (err) {
        return res.status(404).send('NO CANT CANCEL UNKNOWN ORDER');
      }
      if (result.status !== 'Delivered') {
        pool.query('UPDATE "Parcels" SET "status" =$1  WHERE parcelid = $2',
          ['Canceled', parcelid]);
        return res.status(200).send('ORDER CANCELED');
      }
      return res.status(404).send('Cant candel already delivered order');
    });
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
    return res.status(200).send('You have Successfully change your order destination');
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
    return res.status(200).send('Status successfully changed');
  });
};

export const changeorderlocation = (req, res) => {
  const id = parseInt(req.params.parcelid, 10);
  const { location } = req.body;

  pool.query('UPDATE "Parcels" SET "location" =$1 WHERE parcelid = $2',
    [location, id], (err, result) => {
      if (err) {
        return res.status(401).send('BAD REQUEST');
      }
      if (result) {
        return res.status(200).send('ORDER LOCATION CHANGED');
      }
    });
};
