const express = require("express");
let router = express.Router();
const controller = require("../controller/index");

// middleware that is specific to this router
if (process.env.NODE_ENV === "development") {
  router.use(function timeLog(req, res, next) {
    next();
  });
}
// 项目信息
router.get(
  "/",
  (req, res, next) => {
    console.log(req, res, next);
    next();
  },
  controller.test.test
);

// 文件
// router.get('/files/launchEditor', controller.files.launchEditor)
module.exports = router;
