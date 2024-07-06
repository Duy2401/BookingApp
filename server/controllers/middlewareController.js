const jwt = require("jsonwebtoken");
const middlewareControlle = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.KEY_ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  // IF YOU IS GUEST WANT BOOK SERVICE OF WEBSITE
  verifyUser: (req, res, next) => {
    middlewareControlle.verifyToken(req, res, () => {
      if (req.user.isRole === 1) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // IF YOU IS PARTNER
  verifyPartner: (req, res, next) => {
    middlewareControlle.verifyToken(req, res, () => {
      if (req.user.isRole === 2) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
};

export default middlewareControlle;
