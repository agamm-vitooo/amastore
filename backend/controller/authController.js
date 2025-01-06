import { AuthService } from '../services/authService.js';

export const AuthController = {
    // Registrasi Pengguna
    async register(req, res) {
        const { email, password, role } = req.body;

        try {
            // Validasi input
            if (!email || !password || !role) {
                return res.status(400).json({ error: 'All fields are required: email, password, and role' });
            }

            await AuthService.registerUser(email, password, role);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Registration Error:', error.message);
            res.status(400).json({ error: 'Registration failed', details: error.message });
        }
    },

    // Login Pengguna
    async login(req, res) {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            console.log('Login attempt:', { email, password });

            const token = await AuthService.loginUser(email, password);
            console.log('Token generated:', token);

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login Error Stack Trace:', error);

            if (error.message === 'Invalid email or password') {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            res.status(500).json({ error: 'An unexpected error occurred', details: error.message });
        }
    },
};