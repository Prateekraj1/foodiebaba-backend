const Location = require("../models/Location");

async function getCreateLocation(latitude, longitude) {
  try {
    let location = await Location.findOne({ latitude, longitude });
    if (!location) {
      location = new Location({ latitude, longitude });
      await location.save();
    }

    return location;
  } catch (error) {
    throw new Error(`Error inserting menu items: ${error.message}`);
  }
}

module.exports = { getCreateLocation };
