const Community = require("../models/community")

const createView = (req, res) => {
	res.render("community/create")
}

const getAll = async (req, res) => {
	try {
		const records = await Community.find({})
		if (records && records.length > 0) {
			res.json({
				success: true,
				communities: records
			})
		} else {
			throw new Error("No Community in database")
		}
	} catch (error) {
		console.log("Error getAll community ", error.message)
		res.json({
			success: false,
			error: error.message
		})
	}
}
const create = (req, res) => {
	const data = {
		name: req.body.name,
		coordinators: [],
	}
	Community.create(data)
		.then(record => {
			console.log("Create community: ", record)
			res.render("confirm", {
				type: "community",
				name: data.name}
			)
		})
		.catch(error => {
			console.log("Error when create community", error)
			res.send("Error when create community")
		})
}

module.exports = {
	getAll,
	createView,
	create,
	getAll,
}
