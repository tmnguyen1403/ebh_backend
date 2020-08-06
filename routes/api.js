const router = require("express").Router(),
userController = require("../controllers/user"),
eventController = require("../controllers/event"),
flyerController = require("../controllers/flyer");

router.post("/user/login", userController.authenticate,
	userController.apiAuthenticate, userController.apiLoginError)

/*Check Token all routes below*/
router.use(userController.verifyJWT)
/*-------User------*/
router.post("/user/create", userController.create)
/*-------Event------*/
router.get("/event/get", eventController.getByCommunity)
router.post("/event/create", eventController.create)
/*-------Flyer------*/
router.get("/flyer/get", flyerController.getByCommunity)
router.get("/flyer/create", flyerController.createView)
router.post("/flyer/create", flyerController.create)
module.exports = router
