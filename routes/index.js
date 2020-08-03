const router = require("express").Router(),
userRoutes = require("./user"),
eventRoutes = require("./event"),
communityRoutes = require("./community"),
apiRoutes = require("./api");

router.use("/user", userRoutes)
router.use("/event", eventRoutes)
router.use("/community", communityRoutes)
router.use("/api", apiRoutes)

module.exports = router
