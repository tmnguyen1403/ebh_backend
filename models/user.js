const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
	username: {
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
	communities: [{type: mongoose.Schema.Types.ObjectId, ref: "Community"}]
})

module.exports = mongoose.model("User", userSchema)
