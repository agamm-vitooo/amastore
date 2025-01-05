import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Sudah di-import dengan benar

dotenv.config();
const app = express();

// Konfigurasi CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL asal frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
    credentials: true, // Izinkan pengiriman cookies atau header otentikasi
}));

// Middleware untuk parsing JSON
app.use(express.json());

// // Rute sederhana untuk pengujian
// app.get('/api/auth', (req, res) => {
//     res.json({ message: 'CORS works!' });
// });

// Auth routes
import authRoutes from './routes/authRoute.js';

// User
import userRoutes from './routes/userRoute.js';

// Landing Pages
import heroRoutes from './routes/heroRoute.js';
import advantageRoutes from './routes/advantageRoute.js';
import aboutRoutes from './routes/aboutRoute.js';
import testimonialRoutes from './routes/testimonialRoute.js';

// Katalog
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';

// Auth routes
app.use('/auth', authRoutes);

// Menyusun rute lainnya
app.use('/api/user', userRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/advantage', advantageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});