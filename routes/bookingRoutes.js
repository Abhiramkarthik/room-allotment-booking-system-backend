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

router.get("/", async (req, res) => {
  try {
    const { roomId } = req.query;

    const filter = roomId ? { roomId } : {};
    const bookings = await Booking.find(filter).populate("roomId");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

export default router;

// Delete a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});