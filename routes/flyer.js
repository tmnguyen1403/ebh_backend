const router = require("express").Router(),
flyerController = require("../controllers/flyer")

router.get("/get", flyerController.getByCommunityId)
router.get("/create", flyerController.createView)
router.get("/flyer/:id", flyerController.getById)

router.post("/create", flyerController.create)

module.exports = router
