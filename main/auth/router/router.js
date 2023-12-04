const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const router = new Router();

router.post("/sign_up", userController.signUp);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.get("/me:number", userController.getUser);

module.exports = router;
