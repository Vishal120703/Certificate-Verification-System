const express = require("express")
const router = express.Router()
const authController = require("../controller/authController")
// const { authenticate } = require("../middlewares/auth.middleware");
// const { authorize } = require("../middlewares/role.middleware");

router.post("/create-admin",authController.createAdmin);
router.post("/login",authController.postLogin);


module.exports = router;