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
}
//test communitySchema
// const Community = require("./models/community")
//
// let c_data = {
// 	name: "Conroe",
// 	users: []
// }
// Community.create(c_data)
// 	.then(r => console.log(r))
// 	.catch(error => console.log("Error in creating community ", error))
// 	.then (() => console.log("successfully create community"))
// //test userSchema
// const User = require("./models/user")
//
// const data = {
// 	username: "Tomriddle",
// 	password: "1234",
// 	coordinator: "Tom",
// 	phone: "123456789",
// 	communities: [],
// 	admin: 0,
// }
// Community.findOne({name: "conroe"})
// 	.then((record) => {
// 		console.log("Found community", record)
// 		data.communities.push(record)
// 		User.create(data)
// 		.then(r => {
// 			console.log("Result", r)
// 		})
// 		.catch(error => {
// 			console.log(error)
// 		})
// 		.then(() => {
// 			console.log("End promise")
// 			mongoose.connection.close()
// 		})
// 	}
// 	)
// 	.catch(error => console.log("Error in find community"))
