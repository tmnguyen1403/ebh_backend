const Flyer = require("../models/flyer")
const formidable = require("formidable")

const getByCommunity = async (req, res) => {
	const communityid = req.params.id || req.headers.communityid
	try
	{
		const flyers = await Flyer.find({community: communityid})
		if (flyers && flyers.length > 0) {
			console.log("getFlyers ", flyers)
			res.json({
				success: true,
				flyers: flyers
			})
		}
		else {
			throw new Error(`No flyer in community: ${communityid}`)
		}
	} catch(error){
		console.log("Error get flyer", error.message)
		res.json({
			success: false,
			error: error.message
		})
	}
}

const createView = (req, res) => {
	res.render("flyer/create")
}

const getFileName = (fpath) => {
	if (fpath)
		return fpath.substr(fpath.lastIndexOf("/")+1)
	return null
}
const create = (req, res) => {
		console.log("Create Flyer")
	const form = new formidable.IncomingForm();
	form.uploadDir = process.cwd() + '/public/uploads'
	form.keepExtensions = true
	form.parse(req, async (error, fields, files) => {
		if (error) {
			console.log("Error creating flyer")
			res.json({
				success: false,
				error: error.message,
			})
		}
		else {
			const { title, communityid } = fields
			const background = getFileName(files.background.path)
			const flyer1 = getFileName(files.flyer1.path)
			const flyer2 = getFileName(files.flyer2.path)
			console.log(background)
			if (background === null) {
				res.json({
					success: false,
					error: "Please provide background image for flyer"
				})
				return;
			}
			const data = {
				title,
				background,
				flyer1,
				flyer2,
				community: communityid
			}
			try {
				const record = await Flyer.create(data)
				console.log("Creating flyer successfully. Record", record)
				res.json({
					success: true,
					message: "Flyer is created"
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
	getByCommunity,
	create,
	createView,
}
