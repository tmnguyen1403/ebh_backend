const User = require("../models/user")
const Community = require("../models/community")

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

exports.getCreateView = (req, res) => {
	res.render("createUser")
}

exports.getLoginView = (req, res) => {
	res.render("login")
}
exports.getUser = (req, res) => {

}

exports.login = (req, res) => {
	//need validate user
	res.send("login successfully")
}

exports.createUser = (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
		coordinator: req.body.coordinator,
		phone: req.body.phone,
		communities: [],
		admin: req.body.admin,
	}
	const communities = req.body.communities
	Community.find({name: {$in: communities}})
		.then(records => {
			data.communities = records
			console.log("User data", data)
			User.create(data)
				.then(record => {
					console.log(record)
					res.render("confirm", {type: "user", name: data.username})
				})
				.catch(error => {
					console.log("error when create user", error)
					res.send("error when create user")
				})
		})
		.catch(error => {
			console.log("Error when find communities")
			res.send("Error when find communities while creating user")
		})
}
