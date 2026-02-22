const express = require("express")
const router = express.Router()
const showController = require("../controller/showController")
const {authenticate} = require("../middlewares/auth.middleware")
const {authorizeRoles} = require("../middlewares/auth.role.middleware")

router.get("/allAdmin",authenticate,authorizeRoles("super_admin"),showController.getUsers);
router.get("/allCertificates",authenticate,authorizeRoles("super_admin","admin"),showController.getAllCertificates)


module.exports = router;