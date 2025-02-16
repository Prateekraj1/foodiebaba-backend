// models/MenuItem.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuItemSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String, // Single image URL
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
  },
  { timestamps: true, collection: 'menu_items' }
);

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;