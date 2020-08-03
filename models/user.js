const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		require: true,
	},
	coordinator: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	admin: {
		type: Number,
		min: 0,
		max: 3,
		required: true,
	},
	communities: [{type: ObjectId, ref: "Community"}],
	events: [{type: ObjectId, ref: "Event"}],
	flyers: [{type: ObjectId, ref: "Flyer"}],
})

//hook to hash password
userSchema.pre("save", function(next) {
	let user = this

	bcrypt.hash(user.password, 10).then(hash => {
		user.password = hash
		next()
	})
	.catch(error => {
		console.log(`Error in hashing password: ${error.message}`)
		next(error)
	})
})

/*
return: promise
*/
userSchema.methods.passwordComparison = function(inputPassword) {
	let user = this
	return bcrypt.compare(inputPassword, user.password)
}

module.exports = mongoose.model("User", userSchema)
