const router = require("express").Router(),
userRoutes = require("./user"),
eventRoutes = require("./event"),
communityRoutes = require("./community");

router.use("/user", userRoutes)
router.use("/event", eventRoutes)
router.use("/community", communityRoutes)

module.exports = router
