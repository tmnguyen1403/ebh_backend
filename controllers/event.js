const Event = require("../models/event")
const User = require("../models/user")

const createView = (req, res) => {
	res.render("event/create")
}

const create = async (req, res) => {
	const body = req.body
	console.log("create event", body)
	const data = {
		name: body.name,
		location: body.location,
		description: body.description,
		date: body.date,
		start: body.start,
		end: body.end,
		creator: body.creator,
		community: body.communityid,
	}
	try {
		if (!body.creator) {
			const creator = res.locals.creator
			if (creator === null) throw new Error("Cannot find creator")
			data.creator = creator._id
		}
		const record = await Event.create(data)
		console.log("Create new event successfully: ", record)
		//add event to the creator record
	/*	creator.events.push(record._id)
		const result = await creator.save()
		console.log("Save new event to creator successfully: ", result)*/
		res.json({
			success: true,
			event: record,
		})
	} catch (error) {
		console.log("ERROR CREATE EVENT: ", error.message)
		res.json({
			success: false,
			error: error.message,
		})
		//res.render("501")
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

const deleteA = (req, res, next) => {
	let eventId = req.params.id
	Event.findByIdAndRemove(eventId)
		.then(() => {
			console.log("EVENT REMOVE: OK")
			res.send("EVENT REMOVE: OK")
			next()
		})
		.catch(error => {
			console.log("EVENT REMOVE ERROR: ", error.message)
			res.render("501")
		})
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

const getByCommunity = async (req, res) => {
	let communityId = req.headers.communityid
	console.log("communityId", communityId)
	try {
		let events = await Event.find({community: communityId})
		res.json({
			success: true,
			events: events
		})
	} catch(error) {
		console.log("GET EVETN ERROR: ", error.message)
		res.json({
			success: false,
			error: error.message,
		})
	}
}

module.exports = {
	getByCommunity,
	createView,
	create,
	show,
	update,
	deleteA,
	showView,
	redirectView,
	updateView,
}
