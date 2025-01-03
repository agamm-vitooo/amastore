import { UserService, sanitizeUser } from '../services/authService.js';

export const UserController = {
    async createUser(req, res) {
        const { email, password, role } = req.body;
        try {
            const user = await UserService.createUser(email, password, role);
            res.status(201).json(sanitizeUser(user)); // Remove password from response
        } catch (error) {
            res.status(400).json({ error: 'Error creating user', details: error.message });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(parseInt(id));
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user); // Sanitized user already from service
        } catch (error) {
            res.status(400).json({ error: 'Error retrieving user', details: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users); // Sanitized users already from service
        } catch (error) {
            res.status(400).json({ error: 'Error retrieving users', details: error.message });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const user = await UserService.updateUser(parseInt(id), data);
            res.status(200).json(sanitizeUser(user)); // Remove password from response
        } catch (error) {
            res.status(400).json({ error: 'Error updating user', details: error.message });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await UserService.deleteUser(parseInt(id));
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: 'Error deleting user', details: error.message });
        }
    },
};