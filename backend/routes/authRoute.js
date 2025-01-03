import express from 'express';
import { UserController } from '../controller/authController.js';

const router = express.Router();

router.post('/', UserController.createUser); // Create a user
router.get('/', UserController.getAllUsers); // Get all users
router.get('/:id', UserController.getUserById); // Get user by ID
router.put('/:id', UserController.updateUser); // Update user
router.delete('/:id', UserController.deleteUser); // Delete user

export default router;