const bcrypt = require('bcrypt');
const AppDataSource = require('../config/db');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await userRepo.save(user);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
