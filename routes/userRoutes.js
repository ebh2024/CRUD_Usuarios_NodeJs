const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes

// GET /usuarios - Get all users
router.get('/', userController.getAllUsersController);

// GET /usuarios/:id - Get user by ID
router.get('/:id', userController.getUserByIdController);

// POST /usuarios - Create a new user
router.post('/', userController.createUserController);

// PUT /usuarios/:id - Update an existing user
router.put('/:id', userController.updateUserController);

// DELETE /usuarios/:id - Delete a user
router.delete('/:id', userController.deleteUserController);

module.exports = router;
