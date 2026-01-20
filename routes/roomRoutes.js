const express = require("express");
const Room = require("../models/Room");
const router = express.Router();

router.post("/add", async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.json(room);
});

router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

module.exports = router;