const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { findByEmail, User } = require('../models/User');

// Customer registration
router.post('/register-customer', [
  body('fullName').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { fullName, email, password } = req.body;
    const existing = await findByEmail(email.toLowerCase());
    if(existing) return res.status(400).json({ error: 'Email already registered' });

    // 👇 agora chamamos direto o User.createUser
    const user = await User.createUser({ 
      fullName, 
      email: email.toLowerCase(), 
      password, 
      role: 'customer' 
    });

    res.status(201).json({ message: 'Customer registered', userId: user._id });
  } catch(e) { 
    console.error(e); 
    res.status(500).json({ error: 'Server error' }); 
  }
});

// Login helper
async function doLogin(req, res, expectedRole) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  try {
    const user = await findByEmail(email.toLowerCase());
    if(!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });

    if(expectedRole && user.role !== expectedRole) 
      return res.status(403).json({ error: 'Forbidden: wrong role' });

    const token = jwt.sign(
      { sub: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '60m' }
    );

    res.cookie('session', token, { 
      httpOnly:true, 
      secure: process.env.NODE_ENV==='production', 
      sameSite:'strict', 
      maxAge:60*60*1000 
    });

    res.json({ message: 'Logged in', role: user.role, fullName: user.fullName });
  } catch(e) { 
    console.error(e); 
    res.status(500).json({ error: 'Server error' }); 
  }
}

// Customer login
router.post('/login-customer', [
  body('email').isEmail(),
  body('password').isString()
], async (req,res) => doLogin(req,res,'customer'));

// Employee login
router.post('/login-employee', [
  body('email').isEmail(),
  body('password').isString()
], async (req,res) => doLogin(req,res,'employee'));

module.exports = router;
