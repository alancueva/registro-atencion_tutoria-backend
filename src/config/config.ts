import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });


const config = {
  app: {
    name: process.env.APP_NAME || 'Backend para sistema de registro de atención tutorial',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || '/api'
  },
  db: {
    host: process.env.DB_HOST_D,
    port: process.env.DB_PORT_D,
    name: process.env.DB_NAME_D,
    user: process.env.DB_USER_D,
    password: process.env.DB_PASSWORD_D,
    dialect: process.env.DB_DIALECT_D,
    connectionLimit: process.env.DB_CONNECTION_LIMIT_D || 10,
    queueLimit: process.env.DB_QUEUE_LIMIT_D || '0',
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS_D || true
  },
  jwt: {
    secret: process.env.JWT_SECRET as string, 
    expiresIn: process.env.JWT_EXPIRES_IN as string,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM
  },
  client: {
    url: process.env.FRONTEND_URL
  },clave_hsh:{
    md5:process.env.HASH_TEXT
  }
};

export default config;