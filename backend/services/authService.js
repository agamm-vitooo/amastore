import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import validator from 'validator';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export const AuthService = {
    // Registrasi Pengguna Baru
    async registerUser(email, password, role) {
        try {
            // Validasi input
            if (!validator.isEmail(email)) {
                throw new Error('Invalid email format');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            if (!['admin', 'user', 'moderator'].includes(role)) {
                throw new Error('Invalid role');
            }

            // Periksa apakah email sudah terdaftar
            const checkEmailQuery = 'SELECT email FROM user WHERE email = ?';
            const existingUser = await new Promise((resolve, reject) => {
                db.query(checkEmailQuery, [email], (err, results) => {
                    if (err) {
                        console.error('Error checking email:', err);
                        return reject(new Error('Database error'));
                    }
                    resolve(results.length > 0 ? results[0] : null);
                });
            });

            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan pengguna baru
            const query = 'INSERT INTO user (email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())';
            return new Promise((resolve, reject) => {
                db.query(query, [email, hashedPassword, role], (err, result) => {
                    if (err) {
                        console.error('Error in registerUser:', err);
                        return reject(new Error('Registration failed'));
                    }
                    console.log('User registered successfully:', result);
                    resolve(result);
                });
            });
        } catch (error) {
            console.error('Error in registerUser:', error.message);
            throw error;
        }
    },

    // Login Pengguna dan buat Token
    async loginUser(email, password) {
        try {
            console.log('Fetching user by email:', email);

            // Validasi input
            if (!validator.isEmail(email)) {
                throw new Error('Invalid email format');
            }

            // Query database untuk menemukan user
            const query = 'SELECT * FROM user WHERE email = ?';
            const user = await new Promise((resolve, reject) => {
                db.query(query, [email], (err, results) => {
                    if (err) {
                        console.error('Database Error:', err);
                        return reject(new Error('Database error'));
                    }
                    console.log('Query Results:', results);
                    if (results.length === 0) {
                        return reject(new Error('Invalid email or password'));
                    }
                    resolve(results[0]);
                });
            });

            console.log('User found:', user);

            // Validasi password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password valid:', isPasswordValid);

            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            // Generate token JWT
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
                expiresIn: '1h',
            });
            console.log('Generated token:', token);

            return { token, role: user.role };
        } catch (error) {
            console.error('Error in loginUser:', error.message);
            throw error;
        }
    },

    // Verifikasi Token JWT
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error('Invalid token:', err);
                    return reject(new Error('Invalid token'));
                }
                console.log('Token verified:', decoded);
                resolve(decoded);
            });
        });
    },
};