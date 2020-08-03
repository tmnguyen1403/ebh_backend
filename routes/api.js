const router = require("express").Router(),
userController = require("../controllers/user")

router.post("/user/login", userController.authenticate, userController.respondJSON)

module.exports = router
