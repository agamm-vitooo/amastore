import prisma from '../prismaClient.js';

// Get all advantages
export async function getAllAdvantages() {
    try {
        return await prisma.advantage.findMany(); // Mengambil semua Advantage
    } catch (error) {
        throw new Error("Error fetching advantages: " + error.message);
    }
}

// Get a single advantage by ID
export async function getAdvantageById(id) {
    try {
        return await prisma.advantage.findUnique({
            where: { id: id },
        });
    } catch (error) {
        throw new Error("Error fetching advantage by ID: " + error.message);
    }
}

// Create a new advantage
export async function createAdvantage(data) {
    try {
        return await prisma.advantage.create({
            data: data, // data harus sesuai dengan schema Advantage
        });
    } catch (error) {
        throw new Error("Error creating advantage: " + error.message);
    }
}

// Update an existing advantage
export async function updateAdvantage(id, data) {
    try {
        return await prisma.advantage.update({
            where: { id: id },
            data: data, // data yang akan diupdate
        });
    } catch (error) {
        throw new Error("Error updating advantage: " + error.message);
    }
}

// Delete an advantage
export async function deleteAdvantage(id) {
    try {
        return await prisma.advantage.delete({
            where: { id: id },
        });
    } catch (error) {
        throw new Error("Error deleting advantage: " + error.message);
    }
}