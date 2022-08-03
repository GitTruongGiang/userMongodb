const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
      required: true,
    },
    isDelete: { type: Boolean, default: false, required: true },
    assignee: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timeStamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
