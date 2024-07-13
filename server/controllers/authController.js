const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/People/users");
const Customers = require("../models/People/customers");
const { setValue, getValue, DelTokeLogout } = require("../helpers/WorkData");
const AuthController = {
  CreateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.isRole,
      },
      process.env.KEY_ACCESS_TOKEN,
      {
        expiresIn: "10s",
      }
    );
  },
  CreateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.isRole,
      },
      process.env.KEY_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );
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
        customer_email: req.body.customer_email,
        customer_password: hashed,
        customer_role: req.body.customer_role,
        customer_dateOfBirth: req.body.customer_dateOfBirth,
      });
      const customers = await NewCustomer.save();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({
        status: true,
        message: "Emaill valided",
        data: error,
      });
    }
  },
  LoginCustomers: async (req, res) => {
    try {
      const customers = await Customers.findOne({
        customer_email: req.body.customer_email,
      });
      if (!customers) return res.status(404).json({ message: "Wrong Email" });

      const valiPass = await bcrypt.compare(
        req.body.customer_password,
        customers.customer_password
      );
      if (!valiPass) return res.status(404).json({ message: "Wrong Password" });
      if (customers && valiPass) {
        const accessToken = AuthController.CreateAccessToken(customers);
        const refreshToken = AuthController.CreateRefreshToken(customers);
        await setValue(customers._id.toString(), refreshToken);
        res.cookie("rfr", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = customers._doc;
        const returnedCustomers = {
          ...others,
          accessToken: accessToken,
        };
        return res.status(200).json({
          status: true,
          message: "Login in Successfully",
          data: returnedCustomers,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: true,
        message: "Your session is not valid",
        data: err,
      });
    }
  },
  // Refresh Token save in DB redis when access Token expires get and compare
  RequestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.rfr;
    try {
      if (!refreshToken)
        return res
          .status(401)
          .json({ status: true, message: "You're not Authenticated" });

      const decoded = jwt.verify(
        refreshToken,
        process.env.KEY_REFRESH_TOKEN,
        (error, user) => {
          if (error) console.log(error);
          return user;
        }
      );
      const oldRefreshToken = await getValue(decoded.id);
      if (oldRefreshToken !== refreshToken) {
        return res.status(403).json({
          status: true,
          message: "Invalid refresh token",
        });
      }
      const newAccessToken = AuthController.CreateAccessToken(decoded);
      const newRefreshToken = AuthController.CreateRefreshToken(decoded);
      await setValue(decoded.id, newRefreshToken);
      res.cookie("rfr", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({
        status: true,
        message: "Request RefreshToken Successfully",
        data: { accessToken: newAccessToken },
      });
    } catch (error) {
      return res.status(500).json({
        status: true,
        message: "Your session is not valid",
        data: error,
      });
    }
  },
  // ACCOUNT LOGOUT
  Logout: async (req, res) => {
    const idUser = req.body;
    try {
      await DelTokeLogout(idUser);
      res.clearCookie("rfr", {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = AuthController;
