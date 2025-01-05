import { AuthService } from '../services/authService.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Ambil header Authorization
    const token = authHeader ? authHeader.split(' ')[1] : null; // Split header jika ada

    console.log('Token received:', token); // Tambahkan log untuk debugging

    if (!token) {
        return res.status(401).json({ error: 'Token required' });
    }

    AuthService.verifyToken(token)
        .then((decoded) => {
            console.log('Decoded token:', decoded); // Lihat isi token setelah decoding
            req.user = decoded;
            next();
        })
        .catch((err) => {
            res.status(403).json({ error: 'Invalid or expired token' });
        });
};

// Middleware untuk role-based authorization
export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : undefined;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'You do not have permission to access this resource' });
        }

        next();
    };
};