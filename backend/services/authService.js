import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const AuthService = {
    // Registrasi Pengguna Baru
    async registerUser(email, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [email, hashedPassword, role], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },

    // Login Pengguna dan buat Token
    async loginUser(email, password) {
        const query = 'SELECT * FROM users WHERE email = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [email], async(err, results) => {
                if (err) return reject('Database error');
                if (results.length === 0) return reject('User not found');

                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) return reject('Invalid password');

                const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
                resolve(token);
            });
        });
    },

    // Verifikasi Token JWT
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return reject('Invalid token');
                resolve(decoded);
            });
        });
    },
};