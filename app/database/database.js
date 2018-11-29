
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const query = [
  `CREATE TABLE IF NOT EXISTS
      "Parcels"(
        parcelid serial PRIMARY KEY NOT NULL,
        "Name" character(80)  NOT NULL,
        "Pickup" character(80) NOT NULL,
        "Destination" character(80)  NOT NULL,
        "Reciever" character(80) NOT NULL,
        userid character(80) NOT NULL,
        "RecieverMail" character(80) NOT NULL,
        "Weight" numeric(10,6) NOT NULL,
        status character(20) NOT NULL,
        location character(50)
    );`,
  `CREATE TABLE IF NOT EXISTS
      "Users"(
        "FirstName" character(15) NOT NULL,
        "LastName" character(15)NOT NULL,
        userid character(20) PRIMARY KEY NOT NULL,
        password character(300) NOT NULL,
        isadmin boolean
       );`,
];

query.forEach(qued => pool.query(qued, error => console.log(error)));
export default pool;
