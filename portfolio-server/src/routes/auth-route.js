// src/routes/authRoute.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../models');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, date_of_birth, photo } = req.body;
  try {
    const existingUser = await db.Admin.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.Admin.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      date_of_birth,
      photo,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await db.Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    let a = await bcrypt.hash("admin", 10)
    console.log(a, password, user.password, isMatch)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
});

module.exports = router;
