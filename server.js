const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory user storage
let users = [];
let nextId = 1;

// Helper function to find user by email
const findUserByEmail = (email) => users.find(user => user.email === email);

// GET /usuarios - Get all users
app.get('/usuarios', (req, res) => {
  res.json(users);
});

// GET /usuarios/:id - Get user by ID
app.get('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
});

// POST /usuarios - Create a new user
app.post('/usuarios', (req, res) => {
  const { nombre, email, edad } = req.body;

  // Basic validation
  if (!nombre || !email || !edad) {
    return res.status(400).json({ message: 'Faltan datos obligatorios: nombre, email y edad son requeridos' });
  }

  // Email validation (non-empty and unique)
  if (findUserByEmail(email)) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }

  const newUser = {
    id: nextId++,
    nombre,
    email,
    edad
  };

  users.push(newUser);
  res.status(201).json(newUser); // 201 Created
});

// PUT /usuarios/:id - Update an existing user
app.put('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userToUpdate = users.find(u => u.id === userId); // Find user directly

  if (!userToUpdate) {
    return res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
  }

  const { nombre, email, edad } = req.body;

  // Basic validation for update
  if (nombre === undefined && email === undefined && edad === undefined) {
      return res.status(400).json({ message: 'Se requiere al menos un campo (nombre, email, edad) para actualizar' });
  }

  // Email uniqueness validation (only if email is provided and different from current)
  if (email && email !== userToUpdate.email && findUserByEmail(email)) {
    return res.status(400).json({ message: 'El nuevo email ya está registrado por otro usuario' });
  }

  // Update user data selectively in place
  if (nombre !== undefined) {
    userToUpdate.nombre = nombre;
  }
  if (email !== undefined) {
    userToUpdate.email = email;
  }
  if (edad !== undefined) {
    userToUpdate.edad = edad;
  }

  res.json(userToUpdate); // Return the updated user object
});

// DELETE /usuarios/:id - Delete a user
app.delete('/usuarios/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const initialLength = users.length;
  users = users.filter(u => u.id !== userId); // Filter out the user

  if (users.length === initialLength) {
    return res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
  }

  res.json({ message: `Usuario con ID ${userId} eliminado correctamente` });
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
