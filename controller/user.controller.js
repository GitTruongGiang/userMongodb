const express = require("express");
const { validationResult } = require("express-validator");
const { AppError, sendResponse } = require("../helper/ultis");
const Users = require("../models/Users");

const userController = {};
userController.getAllUser = async (req, res, next) => {
  const target = req.query;
  const { todayDate, fromDate } = req.body;
  try {
    let lisAllUSers = null;
    if (target.name) {
      lisAllUSers = await Users.find({ name: { $regex: target.name } });
    } else if (target.id) {
      lisAllUSers = await Users.findById(target.id);
    } else if (target.role) {
      lisAllUSers = await Users.find();
      lisAllUSers = lisAllUSers.filter((e) => e.role === target.role);
    } else if (todayDate || fromDate) {
      // console.log(targetName.date);
      const d = new Date(todayDate);
      d.setDate(d.getDate() - fromDate);
      const newD = new Date();
      lisAllUSers = await Users.find({ createdAt: { $gte: d, $lt: newD } });
    } else {
      lisAllUSers = await Users.find();
    }
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

userController.createUser = async (req, res, next) => {
  const infoUser = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
