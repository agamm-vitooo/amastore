import prisma from '../prismaClient.js';

// Ambil semua produk
export const getAllProducts = async() => {
    return await prisma.product.findMany({
        include: {
            category: true, // Termasuk informasi kategori
        },
    });
};

// Perbarui produk berdasarkan ID
export const updateProduct = async(id, updatedData) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        throw new Error('Invalid product ID');
    }

    try {
        return await prisma.product.update({
            where: { id: numericId },
            data: updatedData,
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error('Product not found');
        }
        throw error;
    }
};

// Hapus produk berdasarkan ID
export const deleteProduct = async(id) => {
    return await prisma.product.delete({
        where: { id: parseInt(id) }, // Pastikan ID adalah angka
    });
};