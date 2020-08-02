
const notFoundError = (req, res, next) => {
	res.render("404")
	next()
}

const internalServerError = (error, req, res, next) => {
	res.render("501")
	next()
}

module.exports = {
	notFoundError,
	internalServerError,
}
