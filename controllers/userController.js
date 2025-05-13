const db = require('../db'); // Adjust path as needed if db/index.js is elsewhere

// Controller to get all users
const getAllUsersController = (req, res) => {
  try {
    const users = db.getAllUsers();
    res.json(users);
  } catch (error) {
    // In a real app, you might have more sophisticated error logging
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Controller to get a user by ID
const getUserByIdController = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuario inválido' });
    }
    const user = db.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};

// Controller to create a new user
const createUserController = (req, res) => {
  try {
    const newUser = db.createUser(req.body);
    res.status(201).json(newUser); // 201 Created
  } catch (error) {
    // Handle specific errors from the DB layer
    if (error.message.includes('Faltan datos') || error.message.includes('El email ya está registrado')) {
      return res.status(400).json({ message: error.message });
    }
    // Generic server error
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Controller to update an existing user
const updateUserController = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
     if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuario inválido' });
    }
    const updatedUser = db.updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
    }
    res.json(updatedUser);
  } catch (error) {
     // Handle specific errors from the DB layer
    if (error.message.includes('Se requiere al menos un campo') || error.message.includes('El nuevo email ya está registrado')) {
        return res.status(400).json({ message: error.message });
    }
    // Generic server error
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Controller to delete a user
const deleteUserController = (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
     if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuario inválido' });
    }
    const deleted = db.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
    }
    res.json({ message: `Usuario con ID ${userId} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
};
