const Event = require("../models/event")
const User = require("../models/user")

const getCreateView = (req, res) => {
	res.render("new_event")
}

const createEvent = async (req, res) => {
	const body = req.body
	const data = {
		name: body.name,
		location: body.location,
		description: body.description,
		date: body.date,
		start: body.start,
		end: body.end,
		creator: null,
	}
	try {
		const creator = await User.findOne({username: body.creator})
		if (creator === null) throw new Error("Cannot find creator")
		data.creator = creator._id
		const record = await Event.create(data)
		console.log("Create new event successfully: ", record)
		res.send("Create new event successfully")
	} catch (error) {
		console.log("ERROR CREATE EVENT: ", error.message)
		res.render("501")
	}
}

module.exports = {
	getCreateView,
	createEvent
}
