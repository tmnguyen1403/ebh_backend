const express = require("express"),
app = express(),
router = require("./routes/index"),
db = require("./db_connect");
db.connect()
//middlwares

//interpret post request as PUT, DELETE middleware
//
const methodOverride = require("method-override")
app.use(methodOverride("_method", {
	methods: ["POST", "GET"]
}))

//port
app.set("port", process.env.PORT || 3000)
app.set("view engine", "ejs")
//middleware
//Note: order matters

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", router)
//routes

//middleware
//const errorController = require("./controllers/error")
//app.use(errorController.notFoundError)
//app.use(errorController.internalServerError)
app.listen(app.get("port"), () => {
	console.log(`Listening at port ${app.get("port")}`)
})
