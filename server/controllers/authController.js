const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/People/users");
const Customers = require("../models/People/customers");

const AuthController = {
  CreateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.user_role,
      },
      process.env.KEY_ACCESS_TOKEN,
      {
        expiresIn: "5m",
      }
    );
  },
  CreateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.user_role,
      },
      process.env.KEY_REFRESH_TOKEN,
      {
        expiresIn: "365d",
      }
    );
  },
  //   ACOUNT OF EMPLOYEES
  RegisterUsers: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.user_password, salt);
      const NewUser = new User({
        user_name: req.body.user_name,
        user_gender: req.body.user_gender,
        user_phone: req.body.user_phone,
        user_address: req.body.user_address,
        user_username: req.body.user_username,
        user_email: req.body.user_email,
        user_password: hashed,
        user_role: req.body.user_role,
        user_dateOfBirth: req.body.user_dateOfBirth,
      });
      const user = await NewUser.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  LoginUsers: async (req, res) => {
    const user = await User.findOne({
      user_username: req.body.user_username,
    });
    if (!user) return res.status(404).json("Wrong username");

    const valiPass = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );
    if (!valiPass) return res.status(404).json("Wrong password");
    if (user && valiPass) {
      const accessToken = AuthController.CreateAccessToken(user);
      const refreshToken = AuthController.CreateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
      const { password, ...others } = user._doc;
      const returnedUser = {
        ...others,
        accessToken: accessToken,
      };
      return res.status(200).json(returnedUser);
    }
  },

  //   ACOUNT OF CUSTOMERS
  RegisterCustomers: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.customer_password, salt);
      const NewCustomer = new Customers({
        customer_name: req.body.customer_name,
        customer_gender: req.body.customer_gender,
        customer_phone: req.body.customer_phone,
        customer_address: req.body.customer_address,
        customer_username: req.body.customer_username,
        customer_email: req.body.customer_email,
        customer_password: hashed,
        customer_role: req.body.customer_role,
        customer_dateOfBirth: req.body.customer_dateOfBirth,
      });
      const customers = await NewCustomer.save();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  LoginCustomers: async (req, res) => {
    const customers = await Customers.findOne({
      customer_username: req.body.customer_username,
    });
    if (!customers) return res.status(404).json("Wrong username");

    const valiPass = await bcrypt.compare(
      req.body.customer_password,
      customers.customer_password
    );
    if (!valiPass) return res.status(404).json("Wrong password");
    if (customers && valiPass) {
      const accessToken = AuthController.CreateAccessToken(customers);
      const refreshToken = AuthController.CreateRefreshToken(customers);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
      const { password, ...others } = customers._doc;
      const returnedCustomers = {
        ...others,
        accessToken: accessToken,
      };
      return res.status(200).json(returnedCustomers);
    }
  },
  // Refresh Token save in DB redis when access Token expires get and compare
  RequestRefreshToken: async (req, res) => {
    const refreshToken = res.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not Authenticated");
    jwt.verify(refreshToken, process.env.KEY_REFRESH_TOKEN, (error, user) => {
      if (error) console.log(error);
      const newAccessToken = AuthController.CreateAccessToken(user);
      const newRefreshToken = AuthController.CreateRefreshToken(user);
      res.cookie("RefreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
      return res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  },
  // ACCOUNT LOGOUT
  Logout: async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout successfully");
  },
};

module.exports = AuthController;
