const router = require("express").Router(),
userRoutes = require("./user"),
eventRoutes = require("./event"),
communityRoutes = require("./community"),
flyerRoutes = require("./flyer"),
apiRoutes = require("./api");

router.use("/api", apiRoutes)
router.use("/user", userRoutes)
router.use("/event", eventRoutes)
router.use("/flyer", flyerRoutes)
router.use("/community", communityRoutes)

module.exports = router
