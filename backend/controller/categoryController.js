import {
    getAllCategories,
    updateCategoryById,
    deleteCategoryById
} from '../services/categoryService.js';

export const getCategories = async(req, res) => {
    try {
        const categories = await getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

export const updateCategory = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedCategory = await updateCategoryById(id, name);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category' });
    }
};

export const deleteCategory = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await deleteCategoryById(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
    }
};