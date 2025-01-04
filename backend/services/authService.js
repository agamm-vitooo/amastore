import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt';

// Fungsi untuk menyaring data user (menghapus password)
export function sanitizeUser(user) {
    if (!user) return null;
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
}

// Layanan User
export const UserService = {
    async createUser(email, password, role = "admin") {
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan ke database
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                },
            });

            // Kembalikan data user tanpa password
            return sanitizeUser(newUser);
        } catch (error) {
            console.error("Error in createUser:", error.message);
            throw error;
        }
    },

    async getUserById(id) {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) throw new Error("User not found");
            return sanitizeUser(user);
        } catch (error) {
            console.error("Error in getUserById:", error.message);
            throw error;
        }
    },

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users.map(sanitizeUser);
        } catch (error) {
            console.error("Error in getAllUsers:", error.message);
            throw error;
        }
    },

    async updateUser(id, data) {
        try {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }

            const updatedUser = await prisma.user.update({
                where: { id },
                data,
            });

            return sanitizeUser(updatedUser);
        } catch (error) {
            console.error("Error in updateUser:", error.message);
            throw error;
        }
    },

    async deleteUser(id) {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id },
            });
            return sanitizeUser(deletedUser);
        } catch (error) {
            console.error("Error in deleteUser:", error.message);
            throw error;
        }
    },
};