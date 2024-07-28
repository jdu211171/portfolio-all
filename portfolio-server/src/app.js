const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const configureRoutes = require('./routes');

const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../../portfolio-client/dist")));
// Example middleware (you can define middleware functions in middlewares folder)
// app.use(require('./middlewares/authMiddleware'));

// Configure routes
configureRoutes(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../portfolio-client/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
