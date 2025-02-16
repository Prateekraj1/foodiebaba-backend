const express = require('express');
const { addMenuItemsToRestaurant, registerRestaurant } = require('../controllers/restaurantController');
const router = express.Router();

router.post('/register', registerRestaurant);
router.post('/add-item', addMenuItemsToRestaurant);

module.exports = router;
