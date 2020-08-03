const User = require("../models/user")
const Community = require("../models/community")

//JWT API: secure login
const jsonWebToken = require("jsonwebtoken")

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

const getAdmins = async(req, res) => {
	try {
		let admins = await User.find({admin: 2})
		if (admins === null)
			throw new Error("No admin record in database")
		if (req.query.format === "json")
			res.json(admins)
		else
			res.send("Found admins")
	} catch (error) {
		console.log("ERROR FIND ADMINS: ", error.message)
		res.send("ERROR FIND ADMINS: ")
	}
}

const createView = (req, res) => {
	res.render("user/create")
}

const loginView = (req, res) => {
	res.render("user/login")
}


const authenticate = async (req, res, next) => {
	//need validate user
	try {
		console.log("Authenticate: ", req.url)
		let user = await User.findOne({username: req.body.username}).populate("communities")
		if (user === null) {
			console.log("Error: User does not exist")
			throw new Error("User does not exist")
		}
		let passwordMatch = await user.passwordComparison(req.body.password)
		if (passwordMatch) {
			res.locals.redirect = `/user/${user._id}`
			res.locals.user = user
			next()
		} else {
			throw new Error("Wrong password")
		}
	} catch(error) {
		console.log("Authenticate Error: ", error.message)
		next(error.message)
	}
}

const apiAuthenticate = (req, res, next) => {
	let user = res.locals.user
	if (user) {
		let oneDay = new Date().setDate(new Date().getDate() + 1)
		let signedToken = jsonWebToken.sign(
			{
				data: user._id,
				exp: oneDay
			},
			"secret_encoding_passphrase"
		)
		res.json({
			success: true,
			token: signedToken,
			user: user,
		})
	} else {
		res.json({
			success: false,
			message: "Could not authenticate user",
		})
	}
}

const respondJSON = (req, res) => {
		res.json({
			status: 200,
			data: res.locals
		})
}

const show = (req, res, next) => {
	let userId = req.params.id
	console.log("Show User")
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
	console.log("ShowView User")
	res.render("user/show")
}
/*
input: Date object
return: yyyy-mm-dd String
*/

const update = async (req, res, next) => {
		let userId = req.params.id
		let userParams = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			coordinator: req.body.coordinator,
			phone: req.body.phone,
			communities: [],
			admin: req.body.admin,
		}

		try {
			const communities = await Community.find({name: {$in: req.body.communities}})
			userParams.communities = communities
			let user = await User.findByIdAndUpdate(userId,
				{$set: userParams})
			user.communities = communities
			res.locals.user = user
			next()
		} catch(error) {
			console.log("ERROR UPDATE USER :", error.message)
			res.render("501")
		}
}

const updateView = (req, res) => {
	res.render("user/update")
}

const redirectView = (req, res, next) => {
	let redirectPath = res.locals.redirect
	if (redirectPath)
		res.redirect(redirectPath)
	else
		next()
}

const create = async (req, res) => {
	const data = {
		username: req.body.username,
		email: req.body.email,
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

const deleteA = (req, res, next) => {
	const userId = req.params.id
	User.findByIdAndRemove(userId)
		.then(() => {
			console.log("DELETE USER OK")
			res.send("DELETE USER OK")
		})
		.catch(error => {
			console.log("DELETE USER ERROR", error.message)
			res.render("501")
		})
}

//JsonWebToken
const verifyJWT = (req, res, next) => {
	let token = req.headers.token
	if (token) {
		jsonWebToken.verify(
			token,
			"secret_encoding_passphrase",
			(errors, payload) => {
				if (payload) {
					User.findById(payload.data).then(user => {
						if (user) {
							next ()
						} else {
							res.status(400).json({
								error: true,
								message: "No User Account Found"
							})
						}
					})
				} else {
				res.status(400).json({
					error: true,
					message: "Cannot verify API token"
				})
				next()
			}
		})
		} else {
		res.status(400).json({
			error: true,
			message: "Please provide token"
		})
	}
}
//use this for validating request
const {body, validationResult} = require("express-validator")

const validate = (req, res, next) => {
		console.log("Validate request")
		body("username", "Username cannot be empty").notEmpty()
		body("email").normalizeEmail({
			all_lowercase: true
		}).trim();
		body("email", "Email is invalid").isEmail()
		body("password", "Password cannot be empty").notEmpty()
		console.log("Validate request 2")
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.log("Validation Error: ", errors.array())
			return res.status(400).json({errors: errors.array()})
		} else {
			console.log("Pass validate")
			next()
		}
}

const errorJSON = (error, req, res, next) => {
	let errorObject = {
		status: 501,
		message: ""
	}
	errorObject.message = error ? error.message : "Unknown Error"
	res.json(errorObject)
}
module.exports = {
	getAllUser,
	getAdmins,
	validate,
	authenticate,
	apiAuthenticate,
	verifyJWT,
	create,
	show,
	update,
	deleteA,
	createView,
	loginView,
	showView,
	updateView,
	redirectView,
	respondJSON,
}
