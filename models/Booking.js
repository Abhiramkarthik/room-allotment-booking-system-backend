import mongoose from "mongoose";

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

export default mongoose.model("Booking", bookingSchema);