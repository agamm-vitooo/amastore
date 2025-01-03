import express from 'express';
import * as advantageController from '../controller/advantageController.js';

const router = express.Router();

// Route untuk mendapatkan semua advantage
router.get('/', advantageController.getAllAdvantages);

// Route untuk mendapatkan advantage berdasarkan ID
router.get('/:id', advantageController.getAdvantageById);

// Route untuk membuat advantage baru
router.post('/', advantageController.createAdvantage);

// Route untuk memperbarui advantage
router.put('/:id', advantageController.updateAdvantage);

// Route untuk menghapus advantage
router.delete('/:id', advantageController.deleteAdvantage);

export default router;