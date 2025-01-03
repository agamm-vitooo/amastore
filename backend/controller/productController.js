import { getAllProducts, updateProduct, deleteProduct } from '../services/productService.js';

// Get all products
export const getProducts = async(req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export const updateProductById = async(req, res) => {
    const { id } = req.params; // Ambil ID dari parameter
    const updatedData = req.body; // Data yang dikirimkan dalam body

    // Pastikan id diubah menjadi angka
    const numericId = parseInt(id, 10);

    // Debug log untuk memastikan id valid
    console.log('Numeric ID:', numericId);
    console.log('Updated Data:', updatedData);

    if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        const updatedProduct = await updateProduct(numericId, updatedData); // Panggil service
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error in updateProductById:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
};


// Delete a product by ID
export const deleteProductById = async(req, res) => {
    const { id } = req.params;

    try {
        const deleted = await deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};