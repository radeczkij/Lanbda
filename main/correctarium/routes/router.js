const Router = require("express").Router;
const router = new Router();
const controller = require("../controllers/controller.js");

router.post("/post", controller.controller);
module.exports = router;
