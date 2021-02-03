//Setting up the database queries
const Pool = require('pg').Pool;

const pool = new Pool({
  //Setting up the database from Postgres
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'taskier',
  port: 5432
});

module.exports = pool;