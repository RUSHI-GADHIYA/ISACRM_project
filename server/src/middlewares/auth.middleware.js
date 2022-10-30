const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../db/models/user-model");
const { TokenExpiredError } = jwt;

// middleware to verify a token
const verifyToken = (req, res, next) => {
  // get auth header value
  const token = req.headers["x-access-token"];

  // if token is undefined
  if (!token) {
    return res
      .status(401)
      .json({ message: "Provide Access Token", success: false });
  }

  // verify token
  jwt.verify(token, config.secret, (err, decoded) => {
    // if error
    if (err) {
      // if token is expired
      if (err instanceof TokenExpiredError) {
        // return error saying token is expired
        return res.status(401).json({
          message: "Unauthorized! Access Token was expired!",
          success: false,
        });
      }

      // if other error
      // return error saying token is invalid
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // if no error
    // set userId to the decoded userId
    req.userId = decoded.id;
    next();
  });
};

// middleware to check if user is superAdmin
const isSuperAdmin = (req, res, next) => {
  // find user by id
  User.findById(req.userId, function (err, result) {
    // if error
    if (err) {
      return res.status(401).json({ message: err, success: false });
    }

    // if user not found
    if (!result) {
      return res
        .status(401)
        .json({ message: "User Not Found", success: false });
    }

    // if user is superAdmin
    if (result.role === "superAdmin") {
      // call next middleware
      next();
      return;
    }

    // if user is not superAdmin
    return res.status(403).json({ message: "Forbidden", success: true });
  });
};

// middleware to check if user is RCIC
const isRcic = (req, res, next) => {
  // find user by id
  User.findById(req.userId, function (err, result) {
    // if error
    if (err) {
      return res.status(401).json({ message: err, success: false });
    }

    // if user not found
    if (!result) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    // if user is RCIC
    if (result.role === "rcic") {
      // call next middleware
      next();
      return;
    }

    // if user is not RCIC
    return res.status(403).json({ message: "Forbidden", success: false });
  });
};

// middleware to check if user is RISIA
const isRisia = (req, res, next) => {
  // find user by id
  User.findById(req.userId, function (err, result) {
    // if error
    if (err) {
      return res.status(401).json({ message: err, success: false });
    }

    // if user not found
    if (!result) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    // if user is RISIA
    if (result.role === "risia") {
      // call next middleware
      next();
      return;
    }

    // if user is not RISIA
    return res.status(403).json({ message: "Forbidden", success: false });
  });
};

// middleware to check if user with same email already exists
const emailAlreadyExist = (req, res, next) => {
  // find user by email
  User.find({ email: req.body.email }, function (err, result) {
    // if error
    if (err) {
      return res.status(401).json({ message: err, success: false });
    }

    // if user not found
    if (!result.length) {
      // call next middleware
      next();
      return;
    }

    // if user is found
    return res
      .status(500)
      .json({ message: "Email already exists", success: false });
  });
};

module.exports = {
  verifyToken,
  isSuperAdmin,
  isRcic,
  isRisia,
  emailAlreadyExist
};
