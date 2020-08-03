const express = require("express"),
app = express(),
router = express.Router(),
db = require("./db_connect");
db.connect()
//interpret post request as put middleware
const methodOverride = require("method-override")
router.use(methodOverride("_method", {
	methods: ["POST", "GET"]
}))
//controller
const userController = require("./controllers/user")
const communityController = require("./controllers/community")
const errorController = require("./controllers/error")
const eventController = require("./controllers/event")
//port
app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs")
//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", router)
//routes
router.get("/", (req, res) => {
	res.send("Welcome to Education Base Housing")
})
router.get("/user/login", userController.loginView)
router.get("/user/create", userController.createView)
router.get("/user/:id", userController.show, userController.showView)
router.get("/community/create", communityController.createView)
router.get("/event/create", eventController.createView)
//post
router.post("/user/login", userController.login)
router.post("/user/create", userController.create)
router.post("/community/create", communityController.create)
router.post("/event/create", eventController.create)
//middleware
app.use(errorController.notFoundError)
app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
	console.log(`Listening at port ${app.get("port")}`)
})
