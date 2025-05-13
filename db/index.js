// In-memory user storage
let users = [];
let nextId = 1;

// Helper function to find user by email - internal use
const findUserByEmailInternal = (email) => users.find(user => user.email === email);

// --- Database Interaction Functions ---

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
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
    id: nextId++,
    nombre,
    email,
    edad
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, updateData) => {
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return null; // Indicate user not found
  }

  const userToUpdate = users[userIndex];
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
  if (nombre !== undefined) {
    userToUpdate.nombre = nombre;
  }
  if (email !== undefined) {
    userToUpdate.email = email;
  }
  if (edad !== undefined) {
    userToUpdate.edad = edad;
  }

  return userToUpdate; // Return the updated user object
};

const deleteUser = (id) => {
  const initialLength = users.length;
  users = users.filter(u => u.id !== id);
  return users.length < initialLength; // Return true if deleted, false if not found
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
