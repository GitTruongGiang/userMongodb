const { AppError, sendResponse } = require("../helper/ultis");
const Users = require("../models/Users");

const userController = {};
userController.getAllUser = async (req, res, next) => {
  try {
    const lisAllUSers = await Users.find();
    if (!lisAllUSers) new AppError(400, "Bad Request", "Not Found");
    sendResponse(
      res,
      200,
      true,
      { data: lisAllUSers },
      null,
      "get user successfully"
    );
  } catch (error) {
    next(error);
  }
};

userController.createUser = async (req, res, next) => {
  const infoUser = req.body;
  try {
    if (!infoUser) new AppError(400, "Bad request", "Missing body info");
    const createUser = await Users.create(infoUser);
    sendResponse(
      res,
      200,
      true,
      { data: createUser },
      null,
      "create user successfully"
    );
  } catch (error) {
    next(error);
  }
};

userController.getByIdUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) new AppError(400, "Bad request", "Not Found");
    sendResponse(
      res,
      200,
      true,
      { data: user },
      null,
      "get user by ID success"
    );
  } catch (error) {
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const targetUpdate = req.body;
  const options = { new: true };
  try {
    const updateUser = await Users.findByIdAndUpdate(id, targetUpdate, options);
    if (!updateUser) new AppError(400, "Bad request", "Not Found");
    sendResponse(
      res,
      200,
      true,
      { data: updateUser },
      null,
      "update user success"
    );
  } catch (error) {
    next(error);
  }
};

userController.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };
  try {
    const deleteUser = await Users.findByIdAndDelete(id, options);
    sendResponse(
      res,
      200,
      true,
      { data: deleteUser },
      null,
      "delete user success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
