import prisma from '../prismaClient.js';

// Get all users
export async function getAllUsers() {
    try {
        return await prisma.user.findMany(); // Mengambil semua data User
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
}

// Get a single user by ID
export async function getUserById(id) {
    try {
        return await prisma.user.findUnique({
            where: { id: id }, // Pastikan id sesuai dengan tipe data di Prisma schema
        });
    } catch (error) {
        throw new Error("Error fetching user by ID: " + error.message);
    }
}

// Create a new user
export async function createUser(data) {
    try {
        return await prisma.user.create({
            data: data, // data harus sesuai dengan schema User
        });
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
}

// Update an existing user
export async function updateUser(id, data) {
    try {
        return await prisma.user.update({
            where: { id: id },
            data: data, // Data yang akan diupdate
        });
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
}

// Delete a user
export async function deleteUser(id) {
    try {
        return await prisma.user.delete({
            where: { id: id },
        });
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
}