const express = require("express"),
app = express(),
db = require("./db_connect");
db.connect()

//controller
const userController = require("./controllers/user")
const communityController = require("./controllers/community")
//port
app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs")
//middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.get("/", (req, res) => {
	res.send("Welcome to Education Base Housing")
})
app.get("/user/login", userController.getLoginView)
app.get("/user/create", userController.getCreateView)
app.get("/community/create", communityController.getCreateView)
//post
app.post("/user/login", userController.login)
app.post("/user/create", userController.createUser)
app.post("/community/create", communityController.createCommunity)

app.listen(app.get("port"), () => {
	console.log(`Listening at port ${app.get("port")}`)
})
