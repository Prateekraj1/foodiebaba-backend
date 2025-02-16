// controllers/restaurantController.js
const RestaurantOwner = require("../models/RestaurantOwner");
const Restaurant = require("../models/Restaurant");
const { addMenuItems } = require("../helper/MenuHelper");
const { getCreateLocation } = require("../helper/LocationHelper");


exports.registerRestaurant = async (req, res) => {
  try {
    const {
      ownerEmail,
      restaurantName,
      restaurantImage,
      gstinNumber,
      latitude,
      longitude,
      menuItems,
    } = req.body;

    const owner = await RestaurantOwner.findOne({ email: ownerEmail });
    if (!owner) {
      return res
        .status(404)
        .json({ success: false, errorMessage: "Restaurant owner not found" });
    }

    let location = await getCreateLocation(latitude, longitude);
    const existingRestaurant = await Restaurant.findOne({
      ownerId: owner._id,
      "location.latitude": latitude,
      "location.longitude": longitude,
    });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        errorMessage: "You already have a restaurant at this location.",
      });
    }

    const restaurant = new Restaurant({
      ownerId: owner._id,
      restaurantName,
      restaurantImage,
      gstinNumber,
      location: location._id,
    });

    await restaurant.save();

    if (menuItems && menuItems.length > 0) {
      await addMenuItems(restaurant._id, menuItems);
    }

    res.status(201).json({
      success: true,
      successMessage: "Restaurant registered successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMenuItemsToRestaurant = async (req, res) => {
  try {
    const { restaurantId, menuItems } = req.body;

    if (!restaurantId || !Array.isArray(menuItems) || menuItems.length === 0) {
      return res.status(400).json({
        success: false,
        errorMessage:
          "Restaurant ID and a non-empty array of menu items are required.",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        errorMessage: "Restaurant not found.",
      });
    }

    const insertedItems = await addMenuItems(restaurantId, menuItems);

    res.status(201).json({
      success: true,
      successMessage: "Menu items added successfully.",
      menuItems: insertedItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errorMessage: error.message,
    });
  }
};
