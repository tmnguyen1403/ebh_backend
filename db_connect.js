module.exports.connect = () => {
	const mongoose = require("mongoose"),
	dbURL = "mongodb://localhost:27017/",
	dbName = "education_base_housing";

	mongoose.connect(dbURL + dbName,
		{useNewUrlParser: true},
		(error, result) =>
		{
			if (error)
				console.log("Error in connection", error)
			else
				console.log(`Connect successfully to db: ${dbName}`)
			}
	)
	mongoose.Promise = global.Promise
	//turn off warning when use findOneAndUpdate
	mongoose.set('useFindAndModify', false)
}
