import express from 'express';
import {
    getCategories,
    updateCategory,
    deleteCategory,
} from '../controller/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;