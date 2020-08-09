
const notFoundError = (req, res, next) => {
	res.render("404")
	next()
}

const internalServerError = (error, req, res, next) => {
	res.render("501")
	next()
}

const apiError = (error, req, res, next) => {
	console.log("Server Error ", error.message)
	res.json({
		success: false,
		error: error.message
	})
}
module.exports = {
	notFoundError,
	internalServerError,
	apiError,
}
