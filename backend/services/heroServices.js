import prisma from '../prismaClient.js';

// Ambil Hero Section
export const getHeroSection = async() => {
    return await prisma.heroSection.findFirst();
};

// Create Hero Section
export const createHeroSection = async(data) => {
    try {
        return await prisma.heroSection.create({
            data: data, // data yang diterima dari request
        });
    } catch (error) {
        throw new Error("Error creating Hero Section: " + error.message);
    }
};

// Perbarui Hero Section berdasarkan ID
export const updateHeroSection = async(id, updatedData) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        throw new Error('Invalid Hero Section ID');
    }

    try {
        return await prisma.heroSection.update({
            where: { id: numericId },
            data: updatedData,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error('Hero Section not found');
        }
        throw error;
    }
};

// Hapus Hero Section berdasarkan ID
export const deleteHeroSection = async(id) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
        throw new Error('Invalid Hero Section ID');
    }

    try {
        return await prisma.heroSection.delete({
            where: { id: numericId },
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error('Hero Section not found');
        }
        throw error;
    }
};