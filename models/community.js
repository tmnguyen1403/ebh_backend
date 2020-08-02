const mongoose = require("mongoose")

const communitySchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
		lowercase: true,
		unique: true,
	},
	coordinators: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
})
module.exports = mongoose.model("Community", communitySchema)
