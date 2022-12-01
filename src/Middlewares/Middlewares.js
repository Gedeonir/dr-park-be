const { User } = require("./../../models");
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token and Check if is there.

    if (req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You must login first!",
      });
    }

    //  Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
    console.log(decoded);

    // Check if User exist

    const freshUser = await User.findOne({
      where: { uuid: decoded.uuid },
    });

    if (!freshUser) {
      return res.status(401).json({
        message: "Your session Expired please Login again",
      });
    }

    req.user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Error occured!!",
      err: error.message,
    });
  }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.roleName)) {
        return res.status(403).json({
          message: 'You are not allowed to perform this action.For more info, contact your site Admin',
        });
      }
      next();
    };
  };

  module.exports = {
    protect,
    restrictTo,
  };