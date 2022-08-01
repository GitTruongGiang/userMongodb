const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.get("/", getAllUser);
router.get("/:id", getByIdUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
