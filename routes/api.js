const router = require("express").Router(),
userController = require("../controllers/user")
eventController = require("../controllers/event")

router.post("/user/login", userController.authenticate,
userController.apiAuthenticate)
router.use(userController.verifyJWT)
router.post("/user/create", userController.createView)
router.post("/event/create", eventController.create)
module.exports = router
