const router = require("express").Router(),
communityController = require("../controllers/community");

router.get("/create", communityController.createView)
router.post("/create", communityController.create)

module.exports = router
