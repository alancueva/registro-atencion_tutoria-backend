import mysql from 'mysql2/promise';
import config from './config';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: config.db.waitForConnections === true,
  connectionLimit: config.db.connectionLimit ? Number(config.db.connectionLimit) : 10,
  queueLimit: config.db.queueLimit ? Number(config.db.queueLimit) : 0,
});

export default pool;