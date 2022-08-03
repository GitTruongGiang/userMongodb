const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  assgineeTask,
  deleteTask,
  updateTask,
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.post("/", createTask);
router.get("/:id", assgineeTask);
router.put("/:targetName", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
