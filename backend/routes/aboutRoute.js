import express from 'express';
import * as aboutController from '../controller/aboutController.js';

const router = express.Router();

// Route untuk mendapatkan semua about page
router.get('/', aboutController.getAllAboutPages);

// Route untuk mendapatkan about page berdasarkan ID
router.get('/:id', aboutController.getAboutPageById);

// Route untuk membuat about page baru
router.post('/', aboutController.createAboutPage);

// Route untuk memperbarui about page
router.put('/:id', aboutController.updateAboutPage);

// Route untuk menghapus about page
router.delete('/:id', aboutController.deleteAboutPage);

export default router;