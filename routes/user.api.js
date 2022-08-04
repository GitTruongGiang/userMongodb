const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  getAllUser,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.get("/", getAllUser);
router.get("/:id", getByIdUser);
router.post("/", body("name").isString(), body("role").isString(), createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
