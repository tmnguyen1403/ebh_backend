const User = require("../models/user")

exports.getAllUser = (req, res) => {
	User.find({})
		.then(records => {
			console.log(JSON.stringfiy(records))
			res.send("Get all user")
		})
		.catch(error => {
			console.log(error)
		})
}

exports.getUser = (req, res) => {

}

exports.saveUser = (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
		coordinator: req.body.coordinator,
		phone: req.body.phone,
		communities: req.body.communities,
	}
	User.create(data)
		.then(record => {
			console.log(record)
			res.send("Saved user")
		})
		.catch(error => {
			console.log("error")
		})
		.then(() => {
			console.log(`Save user successfully`)
		})
}
