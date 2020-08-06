const router = require("express").Router(),
flyerController = require("../controllers/flyer")

router.get("/get", flyerController.get)
router.get("/create", flyerController.createView)
router.post("/create", flyerController.create)

module.exports = router
