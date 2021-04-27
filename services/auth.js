const validator = require('validator');

const AppError = require('../utils/AppError');
const User = require('../models/User');

exports.signup = async ({ email, password, passwordConfirmation }) => {
  if (!password || !email || !passwordConfirmation) {
    throw new AppError('All fields are required', 422, 1);
  }

  if (!validator.isEmail(email)) {
    throw new AppError('Invalid Email', 422, 2);
  }

  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 422, 3);
  }

  if (password !== passwordConfirmation) {
    throw new AppError('Password is not a same as confirmation', 422, 4);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('User already existed', 422, 5);
  }

  const user = new User({
    email,
    password
  });

  await user.save();

  return user;
};
