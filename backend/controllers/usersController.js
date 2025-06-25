const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      //Then you send it back with a 200 success response.
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

//Create User
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "You have successfully found user by id",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Edit user by ID
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(202).json({
      status: "success",
      message: "You have successfully edited user",
      matchedCount: results.matchedCount,
      modifiedCount: results.modifiedCount,
    });
  } catch (err) {
    next(err);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      deletedCount: results.deletedCount,
      message: "You have successfully deleted user",
    });
  } catch (err) {
    next(err);
  }
};
