import mysql from 'mysql2/promise';
import fs from 'fs';

// Load the CA certificate
const sslCa = fs.readFileSync('/home/praveen/Downloads/ca.pem', 'utf-8');

// Create a connection pool with SSL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string, 10), // Convert port to number
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: sslCa,
  },
});

export default pool;
