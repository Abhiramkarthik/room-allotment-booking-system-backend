import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/book", async (req, res) => {
  const { roomId, startTime, endTime } = req.body;

  const conflict = await Booking.findOne({
    roomId,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } }
    ]
  });

  if (conflict)
    return res.status(400).json({ message: "Time conflict detected" });

  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Room booked successfully" });
});

export default router;