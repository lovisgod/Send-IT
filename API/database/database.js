const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'Send-IT-Parcels',
  password: 'lovisgod94',
  port: 5432,
});
export default pool;
