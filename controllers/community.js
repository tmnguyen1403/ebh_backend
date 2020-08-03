const Community = require("../models/community")

const createView = (req, res) => {
	res.render("community/create")
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
	createView,
	create,
}
