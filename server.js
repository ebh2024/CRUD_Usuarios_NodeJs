const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/usuarios', userRoutes); // Mount user routes under /usuarios

// Start the server
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
