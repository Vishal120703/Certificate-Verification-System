const express = require("express")
const router = express.Router();
const Controller = require("../controller/certificateController")
const {authenticate} = require("../middlewares/auth.middleware")
const {authorizeRoles} = require("../middlewares/auth.role.middleware")
const upload = require("../middlewares/upload.middleware")

router.post("/create",authenticate,authorizeRoles("super_admin","admin"),Controller.createCertificate);
router.get("/verify/:certificateId",Controller.verifyCertificate);
router.post("/upload",authenticate,authorizeRoles("admin","super_admin"),upload.single("file"),Controller.uploadExcel);
router.get("/download/:certificateId",Controller.downloadCertificate);



module.exports = router;