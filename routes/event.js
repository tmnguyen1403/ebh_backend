const router = require("express").Router(),
eventController = require("../controllers/event")

router.get("/get", eventController.getByCommunity)
router.get("/create", eventController.createView)
router.post("/create", eventController.create)
router.get("/:id", eventController.show, eventController.showView)
router.get("/:id/update", eventController.show, eventController.updateView)
router.put("/:id/update", eventController.update, eventController.redirectView)
router.delete("/:id/delete", eventController.deleteA)

module.exports = router
