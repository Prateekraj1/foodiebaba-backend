// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const RestaurantOwner = require('../models/RestaurantOwner');
const Customer = require('../models/Customer');
const { v4: uuidv4 } = require('uuid');


//register user logic
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      role,
      restaurantName,
      address,
    } = req.body;

    if (!name || !email || !phoneNumber || !password || !role) {
      return res.status(200).json({
        success: false,
        errorMessage: "Invalid Data",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        errorMessage: "Email already in use",
      });
    }

    if (role !== "customer" && role !== "restaurant_owner") {
      return res.status(200).json({
        success: false,
        errorMessage: "Invalid role",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueKey = uuidv4().split("-")[0]; // Generate a 12-character unique key

    const user = new User({
      name,
      email,
      phoneNumber,
      uniqueKey,
      password: hashedPassword,
    });

    await user.save();

    let userRole;
    if (role === "customer") {
      const customer = new Customer({
        userId: user._id,
        address,
      });
      await customer.save();
      userRole = "customer";
    } else if (role === "restaurant_owner") {
      const restaurantOwner = new RestaurantOwner({
        userId: user._id,
        restaurantName,
      });
      console.log('Saving Restaurant Owner:', restaurantOwner);
      await restaurantOwner.save();
      userRole = "restaurant_owner";
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      successMessage: "User registered successfully",
      user: userWithoutPassword,
      role: userRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        success: false,
        errorMessage: "Invalid Data",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: false,
        errorMessage: "Invalid data",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        errorMessage: "Invalid credentials",
      });
    }

    const userId = user._id;

    const customer = await Customer.findOne({ userId });
    if (customer) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "customer",
      });
    }

    const restaurantOwner = await RestaurantOwner.findOne({ userId });
    if (restaurantOwner) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "restaurant_owner",
      });
    }

    const admin = await Admin.findOne({ userId });
    if (admin) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "admin",
      });
    }

    return res.status(200).json({
      success: false,
      errorMessage: "User role not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
