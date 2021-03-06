const User = require('../models/userModel');

exports.signup = async (req, res,next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid request',
    });
  }
  next();
};
