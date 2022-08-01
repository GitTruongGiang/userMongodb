const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  assgineeTask,
  deleteTask,
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.post("/", createTask);
router.put("/:targetName", assgineeTask);
router.delete("/:id", deleteTask);

module.exports = router;
