const router = require("express").Router(),
userController = require("../controllers/user"),
eventController = require("../controllers/event"),
flyerController = require("../controllers/flyer"),
errorController = require("../controllers/error");

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
router.get("/flyer", flyerController.getById)
router.get("/flyer/get", flyerController.getByCommunityId)
router.get("/flyer/create", flyerController.createView)
router.get("/flyer/community/:id", flyerController.getByCommunityId)
router.get("/flyer/:id", flyerController.getById)
router.get("/flyer/:id/update", flyerController.updateView)
router.post("/flyer/create", flyerController.create)
router.put("/flyer/:id/update", flyerController.update)
router.delete("/flyer/:id", flyerController.deleteOne)

router.use(errorController.apiError)
module.exports = router
