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

const createView = (req, res) => {
	res.render("user/create")
}

const loginView = (req, res) => {
	res.render("user/login")
}


const login = (req, res) => {
	//need validate user
	res.send("login successfully")
}

const show = (req, res, next) => {
	let userId = req.params.id
	console.log("User id", userId)
	User.findById(userId).populate('communities')
		.then(user => {
			res.locals.user = user
			next()
		})
		.catch(error => {
			console.log(`Error fetching user by ID: ${error.message}`)
			next(error)
		})
}

const showView = (req, res) => {
	console.log("Show view", res.locals.user)
	res.render("user/show")
}

const create = async (req, res) => {
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
	createView,
	loginView,
	login,
	create,
	show,
	showView,
}
