const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
	},
	description: {
		type: String,
	},
	date: {
		type: Date,
		require: true,
	},
	start: {
		type: String,
		required: true,
	},
	end: {
		type: String,
		required: true,
	},
	creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})
module.exports = mongoose.model("Event", eventSchema)
