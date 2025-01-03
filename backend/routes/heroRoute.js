import express from 'express';
import * as heroController from '../controller/heroController.js';

const router = express.Router();

// Endpoint untuk mengambil Hero Section
router.get('/', heroController.getHeroSection);

// Endpoint untuk membuat Hero Section baru
router.post('/', heroController.createHeroSection);

// Endpoint untuk memperbarui Hero Section
router.put('/:id', heroController.updateHeroSection);

// Endpoint untuk menghapus Hero Section
router.delete('/:id', heroController.deleteHeroSection);

export default router;