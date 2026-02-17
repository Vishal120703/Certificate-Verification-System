const express = require("express")
const router = express.Router();
const Controller = require("../controller/certificateController")
const {authenticate} = require("../middlewares/auth.middleware")
const {authorizeRoles} = require("../middlewares/auth.role.middleware")

router.post("/create",authenticate,authorizeRoles("super_admin","admin"),Controller.createCertificate);
router.get("/verify/:certificateId",Controller.verifyCertificate);



module.exports = router;