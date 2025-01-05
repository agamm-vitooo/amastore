import * as userService from '../services/userService.js';

class UserController {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a single user by ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(Number(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new user
    async createUser(req, res) {
        try {
            const newUser = req.body;
            const user = await userService.createUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update an existing user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const user = await userService.updateUser(Number(id), updatedData);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(Number(id));
            if (user) {
                res.status(200).json({ message: 'User deleted successfully', user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();