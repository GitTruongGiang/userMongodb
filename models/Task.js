const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      required: true,
    },
    assignee: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timeStamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
