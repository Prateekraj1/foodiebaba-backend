// helper/menuItemService.js
const MenuItem = require('../models/MenuItem');

async function addMenuItems(restaurantId, menuItems) {
  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    throw new Error('Menu items should be a non-empty array.');
  }

  const itemsToInsert = menuItems.map(item => ({
    ...item,
    restaurantId,
  }));

  try {
    const insertedItems = await MenuItem.insertMany(itemsToInsert);
    return insertedItems;
  } catch (error) {
    throw new Error(`Error inserting menu items: ${error.message}`);
  }
}

module.exports = { addMenuItems };
