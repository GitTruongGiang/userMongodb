const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getAllTask,
  createTask,
  assgineeTask,
  deleteTask,
  updateTask,
} = require("../controller/task.controller");

router.get("/", getAllTask);
router.post(
  "/",
  body("name").isString(),
  body("status").isString(),
  createTask
);
router.get("/:id", assgineeTask);
router.put("/:targetName", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
