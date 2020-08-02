const User = require("../models/user")
const Community = require("../models/community")

const getAllUser = (req, res) => {
	User.find({})
		.then(records => {
			console.log(JSON.stringfiy(records))
			res.send("Get all user")
		})
		.catch(error => {
			console.log(error)
		})
}

const getCreateView = (req, res) => {
	res.render("createUser")
}

const getLoginView = (req, res) => {
	res.render("login")
}


const login = (req, res) => {
	//need validate user
	res.send("login successfully")
}

const createUser = async (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
		coordinator: req.body.coordinator,
		phone: req.body.phone,
		communities: [],
		admin: req.body.admin,
	}

	try {
		const communities = await Community.find({name: {$in: req.body.communities}})
		data.communities = communities
		const new_user = await User.create(data)
		console.log("new user:", new_user)
		res.render("confirm", {type: "user", name: data.username})
	} catch(error){
		console.log("ERROR CREATE USER",error.message)
		res.send(`error: ${error.message}`)
	}
}

module.exports = {
	getAllUser,
	getCreateView,
	getLoginView,
	login,
	createUser
}
