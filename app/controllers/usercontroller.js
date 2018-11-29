import validating from '../validator/validator';
import pool from '../database/database';

const jwt = require('jsonwebtoken');

/**
 * A class that hadles API request endpoints for users.
 */
class usercontrol {
  static signupuser(req, res) {
    const { error } = validating.validateuser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const user = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      userid: req.body.userid,
      password: req.body.password,
      isadmin: req.body.isadmin,
    };
    pool.connect((err) => {
      if (err) {
        return res.status(404).send('error fetching client from pool', err);
      }
      pool.query(`INSERT INTO "Users"("FirstName", "LastName", "userid", "password","isadmin") 
      VALUES($1, $2, $3, $4,$5)`,
      [user.FirstName, user.LastName, user.userid, user.password, user.isadmin]);
      return res.status(200).send('You have Successfully Signed Up');
    });
  }

  static loginuser(req, res) {
    const { error } = validating.validateuserlogin(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const { userid, password } = req.body;

    pool.query('SELECT * FROM "Users" WHERE userid = $1 AND password = $2',
      [userid, password], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).send('Bad requeest');
        }
        console.log(result.rows[0]);
        jwt.sign({ userid: result.rows[0].userid, isadmin: result.rows[0].isadmin }, 'mysecretkey', (err, token) => {
          res.json({
            token
          });
        });
      });
  }

  // this api endpoint for the user order history
  static getparcelsforuser(req, res) {
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
  }

  static canceltheorder(req, res) {
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
  }

  static changedestination(req, res) {
    const id = parseInt(req.params.parcelid, 10);
    const { Destination, userid } = req.body;

    pool.connect((err) => {
      if (err) {
        res.status(404).send('error fetching client from pool', err);
      }
      pool.query('UPDATE "Parcels" SET "Destination" =$1  WHERE parcelid = $2 AND userid =$3',
        [Destination, id, userid]);
      return res.status(200).send('You have Successfully change your order destination');
    });
  }
}

export default usercontrol;
