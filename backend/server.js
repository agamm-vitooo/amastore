import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

// Konfigurasi CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.options('*', cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.get('/api/auth', (req, res) => {
    res.json({ message: 'CORS works!' });
});

// Auth
import authRoutes from './routes/authRoute.js';

// Landing Pages
import heroRoutes from './routes/heroRoute.js';
import advantageRoutes from './routes/advantageRoute.js';
import aboutRoutes from './routes/aboutRoute.js';
import testimonialRoutes from './routes/testimonialRoute.js';

// Katalog
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';

// Auth
app.use('/api/auth', authRoutes);

// Landing Pages
app.use('/api/hero', heroRoutes);
app.use('/api/advantage', advantageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/about', aboutRoutes);

// Katalog
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});