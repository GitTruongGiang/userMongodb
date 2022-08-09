const taskController = {};
const { validationResult } = require("express-validator");
const { AppError, sendResponse } = require("../helper/ultis");
const Task = require("../models/Task");
const User = require("../models/Users");

taskController.getAllTask = async (req, res, next) => {
  const { name, id, status } = req.body;
  try {
    let ListTask = null;
    if (status) {
      ListTask = await Task.find({ status: status });
    } else if (name) {
      ListTask = await Task.find({
        name: { $regex: name },
      });
      console.log(ListTask);
      console.log(name);
    } else if (id) {
      ListTask = await Task.findById(id);
    } else {
      ListTask = await Task.find();
    }
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //check user and fontend send request inculding userId
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
  const { id } = req.params;
  const { ref } = req.body;
  const options = { new: true };
  try {
    // let found = await Task.findOne({ name: targetName }).populate("assignee");
    let task = await Task.findByIdAndUpdate(id, { assignee: ref }, options);
    // const refound = await User.findById(ref);
    // if (!refound) new AppError(400, "Bad Request", "not found");
    // found.assignee = ref;
    // found = await found.save();
    sendResponse(res, 200, true, { data: task }, null, "Add assginee success");
  } catch (error) {
    next(error);
  }
};
taskController.updateTask = async (req, res, next) => {
  const { targetName } = req.params;
  const { data, id } = req.body;
  const options = { new: true };
  try {
    const user = await User.findOne({ name: targetName });
    if (user.role === "employee") {
      let taskId = await Task.findById(id);
      if (taskId.status === "pending") {
        let taskUpdate = null;
        let err = null;
        data.status === "working"
          ? (taskUpdate = await Task.findByIdAndUpdate(id, data, options))
          : (err = new AppError(400, "Bad Request", "not working"));
        sendResponse(
          res,
          200,
          true,
          { data: taskUpdate },
          null,
          "update task success"
        );
      } else if (taskId.status === "working") {
        let taskUpdate = null;
        let err = null;
        data.status === "review"
          ? (taskUpdate = await Task.findByIdAndUpdate(id, data, options))
          : (err = new AppError(400, "Bad Request", "not review"));
        sendResponse(
          res,
          200,
          true,
          { data: taskUpdate },
          null,
          "update task success"
        );
      } else if (taskId.status === "review") {
        data
          ? (err = new AppError(400, "Bad Request", "not update"))
          : (err = new AppError(400, "Bad Request", "not update"));
      }
    }
    if (user.role === "manager") {
      let taskId = await Task.findById(id);
      if (taskId.status === "review") {
        let taskUpdate = null;
        let err = null;
        data.status === "done"
          ? (taskUpdate = await Task.findByIdAndUpdate(id, data, options))
          : (err = new AppError(400, "Bad Request", "not done"));
        taskUpdate
          ? sendResponse(
              res,
              200,
              true,
              { data: taskUpdate },
              null,
              "update task success"
            )
          : next(err);
      }
      if (taskId.status === "done") {
        let taskUpdate = null;
        let err = null;
        data.status === "archive"
          ? (taskUpdate = await Task.findByIdAndUpdate(id, data, options))
          : (err = new AppError(400, "Bad Request", "not archive"));
        taskUpdate
          ? sendResponse(
              res,
              200,
              true,
              { data: taskUpdate },
              null,
              "update task success"
            )
          : next(err);
      }
      if (taskId.status !== "done") {
        const taskUpdate = await Task.findByIdAndUpdate(id, data, options);
        console.log(taskUpdate);
        sendResponse(
          res,
          200,
          true,
          { data: taskUpdate },
          null,
          "update task success"
        );
      }
    }
  } catch (error) {
    next(error);
  }
};
taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const { refIsDelete } = req.body;
  const options = { new: true };
  try {
    const TaskId = await Task.findById(id);
    console.log(TaskId.isDelete);
    if (TaskId.isDelete === false) {
      const deleteTask = await Task.findByIdAndUpdate(
        id,
        { isDelete: refIsDelete },
        options
      );
      sendResponse(
        res,
        200,
        true,
        { data: deleteTask },
        null,
        "delete task success"
      );
    }
    if (TaskId.isDelete === true) {
      const deleteTask = await Task.findOneAndDelete(id, options);
      sendResponse(
        res,
        200,
        true,
        { data: deleteTask },
        null,
        "delete task success"
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = taskController;
