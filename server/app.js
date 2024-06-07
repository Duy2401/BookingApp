const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// ROUTER
const AuthRouter = require("./routers/Auth");
const HotelRouter = require("./routers/Hotel");
const FlightRouter = require("./routers/Flight");
const TourRouter = require("./routers/Tour");

dotenv.config();
const app = express();

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
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Router
app.use("/v1/auth", AuthRouter);
app.use("/v1/hotel", HotelRouter);
app.use("/v1/flight", FlightRouter);
app.use("/v1/tour", TourRouter);

// PORT RUN SERVER
app.listen(8000, () => {
  console.log("Server is running");
});
