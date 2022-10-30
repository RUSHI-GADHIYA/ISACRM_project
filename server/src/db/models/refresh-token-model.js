const mongoose = require("mongoose");
const config = require("../../config/auth.config");
const { v4: uuidv4 } = require("uuid");

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  expiryDate: { type: Date, required: true },
});

// Generate a new refresh token
RefreshTokenSchema.statics.generateToken = async function (user) {
  let expiredAt = new Date();

  // set the seconds to current time + config.refreshTokenExpiryTime
  expiredAt.setSeconds(expiredAt.getSeconds() + config.refreshTokenExpiryTime);

  // generate a random token using uuid
  let _token = uuidv4();

  // create a new RefreshToken model
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  // save that model to the database
  let refreshToken = await _object.save();

  // return the newly generated token
  return refreshToken.token;
};

// Verify if the token is expired
RefreshTokenSchema.statics.isTokenExpired = (token) => {
  // by comparing the current time with the expiry date of the token
  // if the current time is greater than the expiry date, then the token is expired
  return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
