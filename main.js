const express = require("express"),
app = express(),
router = express.Router(),
db = require("./db_connect");
db.connect()
//middlwares

//interpret post request as put middleware
const methodOverride = require("method-override")
router.use(methodOverride("_method", {
	methods: ["POST", "GET"]
}))
//cookie
const expressSession = require("express-session"),
cookieParser = require("cookie-parser"),
connectFlash = require("connect-flash")
router.use(cookieParser("secret_passcode"))
router.use(expressSession({
	secret: "secret_passcode",
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false,
}))
router.use(connectFlash())
//controller
const userController = require("./controllers/user")
const communityController = require("./controllers/community")
const errorController = require("./controllers/error")
const eventController = require("./controllers/event")
//port
app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs")
//middleware
//Note: order matters
app.use("/", router)
router.use(express.urlencoded({extended: false}))
router.use(express.json())
//routes


router.get("/", (req, res) => {
	res.send("Welcome to Education Base Housing")
})
router.get("/user/login", userController.loginView)
router.get("/user/create", userController.createView)
router.get("/user/:id", userController.show, userController.showView)
router.get("/user/:id/update", userController.show, userController.updateView)

router.get("/community/create", communityController.createView)
router.get("/event/create", eventController.createView)
router.get("/event/:id", eventController.show, eventController.showView)
router.get("/event/:id/update", eventController.show, eventController.updateView)
//post
router.post("/user/login", userController.authenticate, userController.redirectView)
router.post("/user/create", userController.validate ,userController.create)
router.put("/user/:id/update", userController.update, userController.redirectView)
router.delete("/user/:id/delete", userController.deleteA)

router.post("/community/create", communityController.create)
router.post("/event/create", eventController.create)
router.put("/event/:id/update", eventController.update, eventController.redirectView)
router.delete("/event/:id/delete", eventController.deleteA)

//middleware
app.use(errorController.notFoundError)
app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
	console.log(`Listening at port ${app.get("port")}`)
})
