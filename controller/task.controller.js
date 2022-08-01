const taskController = {};
const { AppError, sendResponse } = require("../helper/ultis");
const Task = require("../models/Task");
const User = require("../models/Users");

taskController.getAllTask = async (req, res, next) => {
  try {
    const ListTask = await Task.find();
    if (!ListTask) new AppError(400, "Bad Request", "Not Found");
    sendResponse(
      res,
      200,
      true,
      { data: ListTask },
      null,
      "get List task success"
    );
  } catch (error) {
    next(error);
  }
};
taskController.createTask = async (req, res, next) => {
  const infoTask = req.body;
  try {
    if (!infoTask) new AppError(400, "Bad Request", "Missing body info");
    const createTask = await Task.create(infoTask);
    sendResponse(
      res,
      200,
      true,
      { data: createTask },
      null,
      "create User success"
    );
  } catch (error) {
    next(error);
  }
};
taskController.assgineeTask = async (req, res, next) => {
  const { targetName } = req.params;
  const { ref } = req.body;
  try {
    let found = await Task.findOne({ name: targetName }).populate("assignee");
    const refound = await User.findById(ref);
    if (!refound) new AppError(400, "Bad Request", "not found");
    found.assignee = ref;
    found = await found.save();
    sendResponse(res, 200, true, { data: found }, null, "Add assginee success");
  } catch (error) {
    next(error);
  }
};
taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };
  try {
    const deleteTask = await Task.findByIdAndDelete(id, options);
    sendResponse(
      res,
      200,
      true,
      { data: deleteTask },
      null,
      "delete task success"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = taskController;
