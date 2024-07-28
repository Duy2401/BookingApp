const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const crypto = require("crypto");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const clieredisClient = require("./helpers/redisDB");
// ROUTER
const AuthRouter = require("./routers/Auth");
const UserRouter = require("./routers/User");
const HotelRouter = require("./routers/Hotel");
const FlightRouter = require("./routers/Flight");
const TourRouter = require("./routers/Tour");
const BookingRouter = require("./routers/Booking");
const PaymentRouter = require("./routers/Payment");
dotenv.config();
const app = express();
const secretKey = crypto.randomBytes(64).toString("hex");
// Database use save value of user and product
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("CONNECT SUCCESS TO MONGODB"));

// Thiết lập session trước khi sử dụng các router
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Để true nếu sử dụng HTTPS
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
const corsOptions = {
  origin: "http://localhost:3000", //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Router
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/hotel", HotelRouter);
app.use("/api/flight", FlightRouter);
app.use("/api/tour", TourRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/payment", PaymentRouter);
// PORT RUN SERVER
app.listen(8000, () => {
  console.log("Server is running");
});
