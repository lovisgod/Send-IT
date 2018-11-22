
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// /**
//  * Create Tables
//  */
// const createtables = () => {
//   const queryText = `CREATE TABLE IF NOT EXISTS
//       Parcels(
//         parcelid integer NOT NULL DEFAULT nextval('"Parcels_parcelid_seq"'::regclass),
//         "Name" character(80) COLLATE pg_catalog."default" NOT NULL,
//         "Pickup" character(80) COLLATE pg_catalog."default" NOT NULL,
//         "Destination" character(80) COLLATE pg_catalog."default" NOT NULL,
//         "Reciever" character(80) COLLATE pg_catalog."default" NOT NULL,
//         userid character(80) COLLATE pg_catalog."default" NOT NULL,
//         "RecieverMail" character(80) COLLATE pg_catalog."default" NOT NULL,
//         "Weight" numeric(10,6) NOT NULL,
//         status character(20) COLLATE pg_catalog."default" NOT NULL,
//         location character(50) COLLATE pg_catalog."default",
//         CONSTRAINT "Parcels_pkey" PRIMARY KEY (parcelid)
//     )
//     WITH (
//         OIDS = FALSE
//     )
//     TABLESPACE pg_default;
//     ALTER TABLE public."Parcels"
//         OWNER to admin;`;
//   const usertext = `CREATE TABLE IF NOT EXISTS
//       Users(
//         "FirstName" character(15) COLLATE pg_catalog."default" NOT NULL,
//         "LastName" character(15) COLLATE pg_catalog."default" NOT NULL,
//         userid character(20) COLLATE pg_catalog."default" NOT NULL,
//         password character(300) COLLATE pg_catalog."default" NOT NULL,
//         isadmin boolean,
//         CONSTRAINT "Users_pkey" PRIMARY KEY (userid)
//     )
//     WITH (
//         OIDS = FALSE
//     )
//     TABLESPACE pg_default;
//     ALTER TABLE public."Users"
//         OWNER to admin;`;

//   pool.query(queryText, usertext)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// /**
//  * Drop Tables
//  */
// const droptables = () => {
//   const queryText = 'DROP TABLE IF EXISTS Parcels';
//   const usertext = 'DROP TABLE IF EXISTS Users';
//   pool.query(queryText, usertext)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
// module.exports = {
//   pool,
//   createtables,
//   droptables
// };

export default pool;
