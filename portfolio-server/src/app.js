const express = require('express');
const dotenv = require('dotenv');

const adminRoute = require('./routes/adminRoute'); // Import your route handler
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example middleware (you can define middleware functions in middlewares folder)
// app.use(require('./middlewares/authMiddleware'));

// Use your imported route
app.use('/api/admin', adminRoute); 


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
