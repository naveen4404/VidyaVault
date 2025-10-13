const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const secret = process.env.JWT_SECRET;
const expiringTime = process.env.JWT_EXPIRES_IN;

// generates the jwt and send it to response
const createAndSendJwt = (user, res, statusCode) => {
  const id = user._id;
  const token = jwt.sign({ id: id }, secret, {
    expiresIn: expiringTime,
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// user signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createAndSendJwt(newUser, res, 201);
});

// user login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check for email and password
  if (!email || !password)
    return next(new AppError("Please enter email and password", 400));

  // find the user based on email
  const user = await User.findOne({ email: email }).select("+password");
  // checking validity
  if (!user || !(await user.comparePasswords(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  createAndSendJwt(user, res, 200);
});

// route protecter
exports.protect = catchAsync(async (req, res, next) => {
  // 1) get token and check if it available
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! please login to get access", 401)
    );
  }
  // 2) verifying the token
  const decoded = await promisify(jwt.verify)(token, secret);
  const currentUser = await User.findById(decoded.id);

  // 3) check if the user is still existed
  if (!currentUser) {
    return next(new AppError("The user with the token is not existed", 401));
  }
  // 4) check if the user has changed password
  if (currentUser.isPasswordChanged(decoded.iat)) {
    return next(
      new AppError("The password was changed recently. Please login again", 401)
    );
  }
  req.user = currentUser;

  next();
});

// me
exports.myProfile = (req, res, next) => {
  res.status(200).json({
    status: "success",
    profile: req.user,
  });
};
