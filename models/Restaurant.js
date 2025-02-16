// models/Restaurant.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "RestaurantOwner",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    restaurantImage: {
      type: [String],
      default: [],
    },
    gstinNumber: {
      type: String,
      required: false,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    status: {
      type: String,
      enum: ["closed", "pending", "approved", "rejected"],
      default: "pending",
    },
    approved_by: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
    }
  },
  { timestamps: true, collection: "restaurants" }
);

restaurantSchema.index({ ownerId: 1, location: 1 }, { unique: true });
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
