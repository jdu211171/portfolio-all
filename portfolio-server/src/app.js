const express = require('express');

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('JDU Student Platform API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
