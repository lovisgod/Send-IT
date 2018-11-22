import validating from '../validator/validator';
import pool from '../database/database';
import harshing from '../bcrypt/bcrypt';

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
    const harsh = harshing.toharsh(user.password);
    pool.connect((err) => {
      if (err) {
        return res.status(404).send('error fetching client from pool', err);
      }
      pool.query('INSERT INTO "Users"("FirstName", "LastName", "userid", "password","isadmin") VALUES($1, $2, $3, $4,$5)',
        [user.FirstName, user.LastName, user.userid, harsh, user.isadmin]);
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
}

export default usercontrol;
