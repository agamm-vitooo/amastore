import { AuthService } from '../services/authService.js';

export const AuthController = {
    // Registrasi Pengguna
    async register(req, res) {
        const { email, password, role } = req.body;
        try {
            await AuthService.registerUser(email, password, role);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Registration failed', details: error.message });
        }
    },

    // Login Pengguna
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.loginUser(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: 'Login failed', details: error.message });
        }
    },
};