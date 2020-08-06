const mongoose = require("mongoose")

const flyerSchema = mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	imageName: {
		type: String,
		require: true,
	},
	community: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Community",
		require: true,
	}
})
module.exports = mongoose.model("Flyer", flyerSchema)
