import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  totalChairs: Number
});

export default mongoose.model("Room", roomSchema);