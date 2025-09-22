const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const jwtSecret="MyNameIsJyoti"
// ------------------------------------
// ✅ Route: Create New User (Signup)
// ------------------------------------
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Name must be at least 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const salt =await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      });

      return res.json({ success: true });
    } catch (error) {
      console.error("DB Error:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// ------------------------------------
// ✅ Route: Login User
// ------------------------------------
router.post('/loginuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
  ] ,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  const { email, password } = req.body;

  try {
    // 🔍 Find user by email
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }

    // 🔐 Check password match (you can hash this with bcrypt)
    const pwdCompare=await bcrypt.compare(password,userData.password)
    if (!pwdCompare) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }
    const data={
        user:{
            id:userData.id
        }
    }
    const authToken=jwt.sign(data,jwtSecret)
    return res.json({ success: true ,authToken});

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
