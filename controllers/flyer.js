const Flyer = require("../models/flyer")
const formidable = require("formidable")
const util = require('util')
const fs = require('fs')
const UPLOAD_PATH = process.cwd() + '/public/uploads'
/*------------------utils function--------------------*/
const getFileName = (file) => {
	if (file && file.path) {
		const fpath = file.path
		return fpath.substr(fpath.lastIndexOf("/")+1)
	}
	return null
}
const deleteFile = (path) => {
	fs.unlink(path, (error) => {
		if (error) throw error
		console.log(`${path} was deleted`)
	})
}

const isDefine = (a) => {
	return (a && a!== undefined && a.length > 0)
}

/*------------------end utils function--------------------*/

const getFlyerParams = async (req) => {
	console.log("getFlyerParams")
	const form = new formidable.IncomingForm();
	form.uploadDir = UPLOAD_PATH
	form.keepExtensions = true
	const parsePromise = (req) => {
		return new Promise((resolve, reject) => {
			form.parse(req, async (error, fields, files) => {
				if (error)
					return reject(error)
				//console.log("ParsePromise ", fields.deleteFiles)
				/*Remove Old Data*/
				let dFiles = fields.deleteFiles
				if (isDefine(dFiles)) {
					dFiles = dFiles.split(";")
						.filter(value => value.length > 0)
					let fnames = dFiles.map(file => file.substr(file.lastIndexOf("/")+ 1))
					let fpaths = fnames.map(name =>
						UPLOAD_PATH + "/"+name)
					try {
						fpaths.forEach(path => deleteFile(path))
						console.log("Complete Remove Old Data")
					} catch(error) {
						console.log(`Error deleting file `, error.message)
					}
				}
				/*End Remove Old Data*/
				const { title, communityid } = fields
				const background = getFileName(files.background)
				const flyer1 = getFileName(files.flyer1)
				const flyer2 = getFileName(files.flyer2)

				let params = {}
				if (background)
					params['background'] = background
				if (title)
					params['title'] = title
				if (flyer1)
					params['flyer1'] = flyer1
				if (flyer2)
					params['flyer2'] = flyer2
				if (communityid)
					params['community'] = communityid
				resolve (params)
				})
		})
	}
	try{
		const params = await parsePromise(req)
		return params
	} catch (error) {
		throw error
	}
}
/*---------------END utils function--------------------*/

const getByCommunityId = async (req, res, next) => {
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
			next(new Error(`No flyer in community: ${communityid}`))
		}
	} catch(error){
		next(error)
	}
}

const getById = async (req, res, next) => {
	const flyerid = req.params.id || req.headers.flyerid
	try
	{
		const flyer = await Flyer.findById(flyerid)
		if (flyer) {
			console.log("getFlyers ", flyer)
			res.json({
				success: true,
				flyer: flyer
			})
		}
		else {
			next(new Error(`No flyer with id: ${flyerid}`))
		}
	} catch(error){
		next(error)
	}
}

const update = async (req, res, next) => {
	const flyerId = req.params.id || req.headers.flyerid
	if (flyerId === null)
		next(new Error(`Please provide flyerId`))
	else {
		try {
			const flyerParams = await getFlyerParams(req)
			let flyer = await Flyer.findByIdAndUpdate(flyerId,
				{$set: flyerParams})
			console.log("Update flyer successfully. Record", flyer)
			res.json({
					success: true,
					message: "Flyer is updated",
			})
		} catch (error) {
			next (error)
		}
	}
}

const createView = (req, res) => {
	res.render("flyer/create")
}

const create = async (req, res, next) => {
	console.log("Create Flyer")
	try {
		const flyerParams = await getFlyerParams(req)
		console.log("FlyerPrams ", flyerParams)
		if (flyerParams["background"] === null)
			return reject (new
				Error("Please provide background image for flyer"))
		const record = await Flyer.create(flyerParams)
		console.log("Creating flyer successfully. Record", record)
		res.json({
			success: true,
			message: "Flyer is created",
		})
	} catch (error) {
		next(error)
	}
}

const updateView = (req, res, next) => {
	console.log("called updateview")
	const flyerId = req.params.id
	res.render("flyer/update", {
		flyer: {
			_id: flyerId,
		}
	})
}
module.exports = {
	getById,
	getByCommunityId,
	create,
	createView,
	update,
	updateView,
}
