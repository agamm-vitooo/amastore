import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

// Define routes
router.get('/', userController.getAllUsers.bind(userController)); // GET all users
router.get('/:id', userController.getUserById.bind(userController)); // GET user by ID
router.post('/', userController.createUser.bind(userController)); // CREATE a new user
router.put('/:id', userController.updateUser.bind(userController)); // UPDATE a user by ID
router.delete('/:id', userController.deleteUser.bind(userController)); // DELETE a user by ID

export default router;