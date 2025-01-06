import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi pool koneksi (untuk penggunaan umum dengan performa lebih baik)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Pool dengan dukungan Promise
export const promisePool = pool.promise();

// Koneksi biasa (untuk kebutuhan spesifik seperti debugging)
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test koneksi pada `db`
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected using single connection');
    }
});

// Test koneksi pada `pool`
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed with pool:', err);
    } else {
        console.log('Database connected using pool');
        connection.release(); // Pastikan koneksi dilepaskan kembali ke pool
    }
});

export default db;