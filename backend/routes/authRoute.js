import express from 'express';
import { AuthController } from '../controller/authController.js';

const router = express.Router();

// Rute Registrasi dan Login
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;