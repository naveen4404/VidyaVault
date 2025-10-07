const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide us your name"],
  },
  email: {
    type: String,
    unique: [true, "user with this email is already existed"],
    required: [true, "Please provide an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    select: false,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "passwords are not same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  joinedOn: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now();
  next();
});

// instance methods
userSchema.methods.comparePasswords = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass); //returns true or false
};
userSchema.methods.isPasswordChanged = function (JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const curTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return curTime > JWTtimeStamp;
  }
  return false;
};
//model
const User = mongoose.model("User", userSchema);
module.exports = User;
