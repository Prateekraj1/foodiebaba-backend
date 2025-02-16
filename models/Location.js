const mongoose = require("mongoose");
const { Schema } = mongoose;
const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

locationSchema.index({ latitude: 1, longitude: 1 }, { unique: true });

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
