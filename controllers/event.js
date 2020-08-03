const Event = require("../models/event")
const User = require("../models/user")

const createView = (req, res) => {
	res.render("event/create")
}

const create = async (req, res) => {
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
		//add event to the creator record
		creator.events.push(record._id)
		const result = await creator.save()
		console.log("Save new event to creator successfully: ", result)
		res.send("Create new event successfully")
	} catch (error) {
		console.log("ERROR CREATE EVENT: ", error.message)
		res.render("501")
	}
}

function getString(value) {
	if (value < 10)
		return "0" + value
	return value.toString()
}

function getFormattedDate(d) {
	console.log("Call formatted date")
	let date = d.getDate()
	let month = d.getMonth()
	let year = d.getFullYear()
	let result = year.toString()
	result += "-" + getString(month + 1)
	result += "-" + getString(date + 1)

	return result
}

const update = async (req, res, next) => {
	const body = req.body
	let eventParams = {
			name: body.name,
			location: body.location,
			description: body.description,
			date: body.date,
			start: body.start,
			end: body.end,
	}
	try {
		const eventId = req.params.id
		let event = await Event.findByIdAndUpdate(eventId,
			{$set: eventParams}
		)
		console.log("Date: ", getFormattedDate(event.date))
		event.date = getFormattedDate(event.date)
		res.locals.redirect = `/event/${eventId}`
		res.locals.event = event
		next()
	} catch (error) {
		console.log("ERROR UPDATE EVENT: ",error.message)
		res.render("501")
	}
}

const show = async (req, res, next) => {
	const eventID = req.params.id
	try {
		const event = await Event.findById(eventID)
		if (event === null)
			throw new Error("Cannot find event with id: ", eventID)
		res.locals.event = event
		next()
	} catch (error) {
		console.log("SHOW EVENT ERROR: ", error.message)
		res.render("501")
	}
}

//VIEWS
const showView = (req, res) => {
	res.render("event/show")
}

const updateView = (req, res) => {
	res.render("event/update")
}

const redirectView = (req, res, next) => {
	let redirectPath = res.locals.redirect
	if (redirectPath)
		res.redirect(redirectPath)
	else
		next()
}

module.exports = {
	createView,
	create,
	show,
	update,
	showView,
	redirectView,
	updateView
}
