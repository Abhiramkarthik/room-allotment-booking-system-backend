const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));