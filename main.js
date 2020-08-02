const express = require("express"),
app = express(),
port = process.env.PORT || 3000
mongoose = require("mongoose")

//connect to mongo db
const dbURL = "mongodb://localhost:27017",
dbName = "education_base_housing";
mongoose.connect(dbURL + dbName, 	{useNewUrlParser: true})

const db = mongoose.connection

//routes
app.get("/", (req, res) => {
	res.send("Welcome to Education Base Housing")
})

app.listen(port, () => {
	console.log(`Listening at port ${port}`)
})
