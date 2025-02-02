const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User'); // Reference to User model

const restaurantOwnerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    approvalStatus: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const RestaurantOwner = mongoose.model('RestaurantOwner', restaurantOwnerSchema);

module.exports = RestaurantOwner;
