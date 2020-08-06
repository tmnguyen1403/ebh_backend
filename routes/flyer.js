const router = require("express").Router(),
flyerController = require("../controllers/flyer")

router.get("/get", flyerController.getByCommunity)
router.get("/create", flyerController.createView)
router.post("/create", flyerController.create)

module.exports = router
