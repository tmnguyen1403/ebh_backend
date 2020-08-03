const router = require("express").Router(),
userController = require("../controllers/user")

router.get("/create", userController.createView)
router.post("/create", userController.validate ,userController.create)
router.get("/login", userController.loginView)
router.post("/login", userController.authenticate, userController.redirectView)
router.get("/:id", userController.show, userController.showView)
router.get("/:id/update", userController.show, userController.updateView)
router.put("/:id/update", userController.update, userController.redirectView)
router.delete("/:id/delete", userController.deleteA)

module.exports = router
