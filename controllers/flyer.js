const Flyer = require("../models/flyer")
const formidable = require("formidable")

const get = (req, res) => {

}

const createView = (req, res) => {
	res.render("flyer/create")
}

const create = (req, res) => {
		console.log("Create Flyer")
	const form = new formidable.IncomingForm();
	form.uploadDir = process.cwd() + '/public/uploads'
	form.keepExtensions = true
	form.parse(req, async (error, fields, file) => {
		if (error) {
			console.log("Error creating flyer")
			res.json({
				success: false,
				error: error.message,
			})
		}
		else {

			const { title, communityid } = fields
			const fpath = file.flyer.path
			const imageName = fpath.substr(fpath.lastIndexOf("/")+1)
			const data = {
				title,
				imageName,
				community: communityid
			}
			try {
				const record = await Flyer.create(data)
				console.log("Creating flyer successfully. Record", record)
				res.json({
					success: true
				})
			} catch (error) {
				console.log("Error creating new flyer", error.message)
				res.json({
					success: false,
					error: error.message,
				})
			}
		}
	});
}

module.exports = {
	get,
	create,
	createView,
}
