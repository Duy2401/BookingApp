const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { createClient } = require("redis");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// ROUTER
const AuthRouter = require("./routers/Auth");
const HotelRouter = require("./routers/Hotel");
const FlightRouter = require("./routers/Flight");
const TourRouter = require("./routers/Tour");
const BookingRouter = require("./routers/Booking");

dotenv.config();
const app = express();

// Database use save value of user and product
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("CONNECT SUCCESS TO MONGODB"));

// Databse use save token and authenticated users

const client = createClient({
  password: process.env.KEY_PASSWORD,
  socket: {
    host: process.env.KEY_HOST,
    port: process.env.KEY_PORT,
  },
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

client.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Router
app.use("/api/auth", AuthRouter);
app.use("/api/hotel", HotelRouter);
app.use("/api/flight", FlightRouter);
app.use("/api/tour", TourRouter);
app.use("/api/booking", BookingRouter);

// PORT RUN SERVER
app.listen(8000, () => {
  console.log("Server is running");
});
