var express = require("express");
var router = express.Router();

/* GET home page. */
const user = require("./user.api");
const task = require("./task.api");
router.get("/", function (req, res, next) {
  res.send("hello word");
});

router.use("/user", user);
router.use("/task", task);
module.exports = router;
