const Community = require("../models/community")

exports.getCreateView = (req, res) => {
	res.render("createCommunity")
}

exports.createCommunity = (req, res) => {
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
