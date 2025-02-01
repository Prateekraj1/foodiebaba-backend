// controllers/userController.js
const bcrypt = require("bcrypt");
const AppDataSource = require("../config/db");
const User = require("../models/User");
const Customer = require("../models/Customer");
const RestaurantOwner = require("../models/RestaurantOwner");
const Admin = require("../models/Admin");
const { v4: uuidv4 } = require("uuid");

// Register User
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
      return res
        .status(200)
        .json({ success: false, errorMessage: "Invalid Data" });
    }

    const userRepo = AppDataSource.getMongoRepository(User);
    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, errorMessage: "Email already in use" });
    }

    if (role !== "customer" && role !== "restaurant_owner") {
      return res
        .status(200)
        .json({ success: false, errorMessage: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueKey = uuidv4().split("-")[0]; // Generate a 12-character unique key

    const user = userRepo.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      uniqueKey,
    });

    await userRepo.save(user);

    let userRole;
    if (role === "customer") {
      const customerRepo = AppDataSource.getMongoRepository(Customer);
      const customer = customerRepo.create({ userId: user._id, address });
      await customerRepo.save(customer);
      userRole = "customer";
    } else if (role === "restaurant_owner") {
      const restaurantOwnerRepo =
        AppDataSource.getMongoRepository(RestaurantOwner);
      const restaurantOwner = restaurantOwnerRepo.create({
        userId: user._id,
        restaurantName,
      });
      await restaurantOwnerRepo.save(restaurantOwner);
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
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, errorMessage: "Invalid Data" });
    }

    const userRepo = AppDataSource.getMongoRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, errorMessage: "Invalid data" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(200)
        .json({ success: false, errorMessage: "Invalid credentials" });
    }

    const userId = user._id;
    const customer = await AppDataSource.getMongoRepository(Customer).findOne({
      where: { userId },
    });
    if (customer) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "customer",
      });
    }

    const restaurantOwner = await AppDataSource.getMongoRepository(
      RestaurantOwner
    ).findOne({ where: { userId } });
    if (restaurantOwner) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "restaurant_owner",
      });
    }

    const admin = await AppDataSource.getMongoRepository(Admin).findOne({
      where: { userId },
    });
    if (admin) {
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        successMessage: "Login successful",
        user: userWithoutPassword,
        role: "admin",
      });
    }

    return res
      .status(200)
      .json({ success: false, errorMessage: "User role not found" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
