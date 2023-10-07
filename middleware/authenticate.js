const jwt = require("jsonwebtoken");
const AppUser = require("../Models/AppUser");
const catchAsyncErrors = require("./catchAsyncErrors");
const BusinessUser = require("../Models/BusinessUser");

const verifyTokenofAppUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new Error("Access denied, token missing!"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await AppUser.findById(decoded.id);

  if (!user) {
    return next(new Error("No user found with this id"));
  }

  req.user = user;
  next();
});

module.exports = verifyTokenofAppUser;

const verifyTokenofBusinessUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new Error("Access denied, token missing!"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await BusinessUser.findById(decoded.id);

  if (!user) {
    return next(new Error("No user found with this id"));
  }

  req.user = user;

  next();
});

module.exports = verifyTokenofBusinessUser;
