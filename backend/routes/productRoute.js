import express from 'express';
import {
    getProducts,
    updateProductById,
    deleteProductById
} from '../controller/productController.js';
import validateProductId from '../middleware/validateProductId.js';

const router = express.Router();

// Rute untuk memperbarui produk berdasarkan ID
router.put('/:id', validateProductId, updateProductById);

// Rute untuk menghapus produk berdasarkan ID
router.delete('/:id', validateProductId, deleteProductById);

// Rute untuk mendapatkan semua produk
router.get('/', getProducts);

export default router;