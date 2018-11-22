import validating from '../validator/validator';
import pool from '../database/database';

class parcelcontrol {
  static postparcels(req, res) {
    const { error } = validating.validateparcels(req.body);
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
        res.status(400).send('error fetching client from pool', err);
        return;
      }
      pool.query(
        'INSERT INTO "Parcels"("Name", "Pickup", "Destination", "Reciever", "userid", "RecieverMail", "Weight", "status", "location" ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [parcel.Name, parcel.Pickup, parcel.Destination, parcel.Reciever, parcel.userid,
          parcel.RecieverMail, parcel.Weight, parcel.status, parcel.location]
      );
      return res.status(200).send('Parcel Added');
    });
  }

  static getparcels(req, res) {
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
  }


  static getparcelswithid(req, res) {
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
  }

  static changedestination(req, res) {
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
  }

  static changeorderstatus(req, res) {
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
  }

  static changeorderlocation(req, res) {
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
  }
}

export default parcelcontrol;
