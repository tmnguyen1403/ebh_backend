const port = process.env.PORT || 3000,
mongoose = require("mongoose")

//connect to mongo db
const dbURL = "mongodb://localhost:27017/",
dbName = "education_base_housing";
mongoose.connect(dbURL + dbName, 	{useNewUrlParser: true}, (error, result) =>
{
	if (error) console.log("Error in connection", error)
	else
		console.log(`Connect successfully to db: ${dbName}`)
})
//test userSchema
const User = require("./models/user")

const data = {
	username: "Tomriddle",
	password: "1234",
	coordinator: "Tom",
	phone: "123456789"
}
User.create(data)
.then(r => {
	console.log("Result", r)
})
.catch(error => {
	console.log(error)
})
.then(() => {
	console.log("Create user successfully")
	mongoose.connection.close()
})
