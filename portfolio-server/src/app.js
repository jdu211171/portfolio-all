const express = require('express');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth-route');
const authMiddleware = require('./middlewares/auth-middleware');

const adminRoute = require('./routes/admins-route'); // Import your route handler
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Example middleware (you can define middleware functions in middlewares folder)
// app.use(require('./middlewares/authMiddleware'));

// Auth routes
app.use('/api/auth', authRoute);

// Protected routes
app.use('/api/admin', authMiddleware, adminRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
