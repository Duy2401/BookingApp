const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const clieredisClient = require("./helpers/redisDB");
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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
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
