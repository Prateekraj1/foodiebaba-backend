const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User"); // Reference to User model

const adminSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
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
  { timestamps: true, collection: "admin" }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
