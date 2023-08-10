const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have a User model
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.redirect('/dashboard');
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
