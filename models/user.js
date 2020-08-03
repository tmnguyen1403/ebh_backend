const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
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

module.exports = mongoose.model("User", userSchema)
