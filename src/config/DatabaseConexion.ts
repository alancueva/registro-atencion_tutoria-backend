
import mysql from 'mysql2/promise';
// import { Pool } from 'pg';

import config from './config';

// const pool = new Pool({
//   user: config.db.user,
//   host: config.db.host,
//   database: config.db.name,
//   password: config.db.password,
//   port: config.db.port ? Number(config.db.port) : 5432,
// })

const pool = mysql.createPool({
  host: config.db.host,
  port: Number(config.db.port),
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: config.db.waitForConnections === true,
  connectionLimit: config.db.connectionLimit ? Number(config.db.connectionLimit) : 10,
  queueLimit: config.db.queueLimit ? Number(config.db.queueLimit) : 0,
});

export default pool;