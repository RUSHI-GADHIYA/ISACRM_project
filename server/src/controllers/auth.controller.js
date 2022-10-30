const config = require("../config/auth.config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Database Models
const User = require("../db/models/user-model");
const RefreshToken = require("../db/models/refresh-token-model");

// sign in
const signIn = (req, res) => {
  // find user by email
  User.findOne({ email: req.body.email }, async (err, user) => {
    // if error
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error while signing in",
        err: err,
      });
    }

    // if user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Wrong email or password",
      });
    }

    // if user found
    // check if password is correct
    let passwordVerification = await bcrypt.compare(req.body.password, user.password);
    console.log(passwordVerification);
    if (!passwordVerification) {
      // if password is incorrect
      return res.status(401).json({
        success: false,
        message: "Wrong email or password",
      });
    }

    // if password is correct
    // create a new token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      config.secret,
      {
        expiresIn: config.accessTokenExpirtyTime,
      }
    );

    // create a new refresh token
    const refreshToken = await RefreshToken.generateToken(user);

    // return the token and refresh token
    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      accessToken: token,
      refreshToken: refreshToken,
      userId: user._id,
      name: user.name,
    });
  });
};

// create a new user
const createUser = (req, res) => {
  const user = new User({
    email: req.body.email,
    role: req.body.role,
    campus: req.body.campus,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    gender: req.body.gender,
    staffId: req.body.staffId,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // save user
  user.save((err, result) => {
    // if error
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error while createing new user",
        err: err,
      });
    }

    // if user created
    return res.status(200).json({
      success: true,
      message: "User created.",
    });
  });
};

// refresh token
const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  // find refresh token
  if (requestToken == null) {
    return res
      .status(403)
      .json({ message: "Refresh Token is required!", success: false });
  }

  try {
    // find refresh token using request token
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    // if refresh token not found
    if (!refreshToken) {
      return res
        .status(403)
        .json({ message: "Refresh token invalid!", success: false });
    }

    // check if found refresh token is expired
    if (RefreshToken.isTokenExpired(refreshToken)) {
      // if expired
      // delete the refresh token
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      return res.status(403).json({
        success: false,
        message: "Refresh token was expired. Please sign in again.",
      });
    }

    // if refresh token is not expired
    // find user using refresh token user id
    const user = await User.findById(refreshToken.user._id);

    // create a new token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      config.secret,
      {
        expiresIn: config.accessTokenExpirtyTime,
      }
    );

    // send the new token
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // find refresh token
  if (email == null) {
    return res
      .status(401)
      .json({ message: "Email is required!", success: false });
  }

  try {
    // if refresh token is not expired
    // find user using refresh token user id
    const user = await User.findOne({ email: email });

    if (user) {
      user.code = "123456";
      user.save();
    } else {
      return res.status(401).json({ message: "Invalid User!", success: false });
    }

    // send the new token
    return res.status(200).json({
      success: true,
      message: "Password send to email!",
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { email, password, code } = req.body;

  // find refresh token
  if (code == null) {
    return res
      .status(401)
      .json({ message: "Code is required!", success: false });
  }

  try {
    // if refresh token is not expired
    // find user using refresh token user id
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.code == code) {
        user.password = bcrypt.hashSync(password, 8);
        user.code = null;
        user.save();
      } else {
        return res
          .status(401)
          .json({ message: "Invalid Code!", success: false });
      }
    } else {
      return res.status(401).json({ message: "Invalid User!", success: false });
    }

    // send the new token
    return res.status(200).json({
      success: true,
      message: "Password reset sucess!",
    });
  } catch (err) {
    return res.status(500).json({ message: err, success: false });
  }
};

module.exports = {
  signIn,
  refreshToken,
  createUser,
  resetPassword,
  forgotPassword,
};
