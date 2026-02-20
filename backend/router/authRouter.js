const express = require("express")
const router = express.Router()
const authController = require("../controller/authController")
const {authenticate} = require("../middlewares/auth.middleware")
const {authorizeRoles} = require("../middlewares/auth.role.middleware")

router.get("/me",authenticate,authController.getMe)
router.post("/create-admin",authenticate,authorizeRoles("super_admin"),authController.createAdmin);
router.post("/login",authController.postLogin);
router.post("/certificate",authController.postStudentLogin);
router.get("/certificate/:email",authController.getStudentCertificate)


module.exports = router;