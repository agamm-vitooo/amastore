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
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });
    },

    async getUserById(id) {
        const user = await prisma.user.findUnique({ where: { id } });
        return sanitizeUser(user);
    },

    async getAllUsers() {
        const users = await prisma.user.findMany();
        return users.map(sanitizeUser);
    },

    async updateUser(id, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return prisma.user.update({
            where: { id },
            data,
        });
    },

    async deleteUser(id) {
        return prisma.user.delete({
            where: { id },
        });
    },
};