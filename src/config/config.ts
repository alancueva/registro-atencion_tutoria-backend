import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

interface Config {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  environment: string;
  allowedOrigins: string[];
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'tutoria-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  environment: process.env.NODE_ENV || 'development',
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:8080']
};

export default config;