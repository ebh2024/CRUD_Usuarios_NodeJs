const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');

// --- Helper Functions for File Operations ---

const loadUsers = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const dataBuffer = fs.readFileSync(DATA_FILE);
      const dataJSON = dataBuffer.toString();
      if (dataJSON) {
        const usersFromFile = JSON.parse(dataJSON);
        // Determine nextId based on existing users
        const maxId = usersFromFile.reduce((max, user) => (user.id > max ? user.id : max), 0);
        return { users: usersFromFile, nextId: maxId + 1 };
      }
    }
  } catch (error) {
    console.error('Error loading users from file:', error);
    // If file is corrupted or unreadable, start fresh
  }
  return { users: [], nextId: 1 }; // Default if file doesn't exist or is empty/corrupt
};

const saveUsers = (users) => {
  try {
    const dataJSON = JSON.stringify(users, null, 2); // Pretty print JSON
    fs.writeFileSync(DATA_FILE, dataJSON);
  } catch (error) {
    console.error('Error saving users to file:', error);
    throw new Error('Could not save user data.'); // Propagate error
  }
};

// Initialize users and nextId from file
let { users, nextId } = loadUsers();

// Helper function to find user by email - internal use
const findUserByEmailInternal = (email) => users.find(user => user.email === email);

// --- Database Interaction Functions (Modified for File Persistence) ---

const getAllUsers = () => {
  // Data is already loaded in 'users' variable
  return users;
};

const getUserById = (id) => {
  // Data is already loaded
  return users.find(u => u.id === id);
};

const createUser = (userData) => {
  const { nombre, email, edad } = userData;

  // Basic validation
  if (!nombre || !email || !edad) {
    throw new Error('Faltan datos obligatorios: nombre, email y edad son requeridos');
  }

  // Email validation (unique)
  if (findUserByEmailInternal(email)) {
    throw new Error('El email ya está registrado');
  }

  const newUser = {
    id: nextId++, // Use and then increment nextId
    nombre,
    email,
    edad
  };
  users.push(newUser);
  saveUsers(users); // Save to file
  return newUser;
};

const updateUser = (id, updateData) => {
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return null; // Indicate user not found
  }

  const userToUpdate = { ...users[userIndex] }; // Create a copy to modify
  const { nombre, email, edad } = updateData;

  // Basic validation for update
  if (nombre === undefined && email === undefined && edad === undefined) {
      throw new Error('Se requiere al menos un campo (nombre, email, edad) para actualizar');
  }

  // Email uniqueness validation (only if email is provided and different from current)
  if (email && email !== userToUpdate.email && findUserByEmailInternal(email)) {
    throw new Error('El nuevo email ya está registrado por otro usuario');
  }

  // Update user data selectively
  let changed = false;
  if (nombre !== undefined && userToUpdate.nombre !== nombre) {
    userToUpdate.nombre = nombre;
    changed = true;
  }
  if (email !== undefined && userToUpdate.email !== email) {
    userToUpdate.email = email;
    changed = true;
  }
  if (edad !== undefined && userToUpdate.edad !== edad) {
    userToUpdate.edad = edad;
    changed = true;
  }

  if (changed) {
    users[userIndex] = userToUpdate;
    saveUsers(users); // Save to file
  }
  return userToUpdate;
};

const deleteUser = (id) => {
  const initialLength = users.length;
  users = users.filter(u => u.id !== id);
  const deleted = users.length < initialLength;
  if (deleted) {
    saveUsers(users); // Save to file
  }
  return deleted; // Return true if deleted, false if not found
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // Expose findUserByEmail if needed externally, otherwise keep internal
  // findUserByEmail: findUserByEmailInternal
};
