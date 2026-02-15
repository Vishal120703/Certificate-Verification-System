const express = require("express")
const router = express.Router()
const authRouter = require("../controller/authController")

router.get("/",authRouter.getAuth);

module.exports = router;