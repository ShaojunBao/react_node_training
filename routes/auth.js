const { Router } = require("express");
const {getControllers} = require("../controller/authController")

const router = Router();

router.post("/register", getControllers.registerController);
router.post("/login", getControllers.loginController);
router.post("/logout", getControllers.logoutController);


module.exports = router;