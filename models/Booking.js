const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
  hostName: String,
  startTime: Number,
  endTime: Number,
  chairsRequired: Number
});

module.exports = mongoose.model("Booking", bookingSchema);