const router = require("express").Router(),
userController = require("../controllers/user"),
eventController = require("../controllers/event"),
flyerController = require("../controllers/flyer"),
fs = require("fs")
//to get image
const formidable = require("formidable")

router.post("/user/login", userController.authenticate,
	userController.apiAuthenticate, userController.apiLoginError)
router.get("/flyer/create", flyerController.createView)

router.post("/flyer/create", flyerController.create)

router.use(userController.verifyJWT)
router.post("/user/create", userController.create)
router.get("/event/get", eventController.getByCommunity)
router.post("/event/create", eventController.create)
router.get("/flyer/get", flyerController.get)
module.exports = router
