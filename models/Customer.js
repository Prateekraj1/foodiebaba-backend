const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User'); // Reference to User model

const customerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    address: {
      type: String,
      default: null,
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

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
