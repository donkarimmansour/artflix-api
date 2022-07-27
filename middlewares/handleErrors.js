const codes = require("../common/codes");

//handle Error
function handleError(err, req, res, next) {
    const code = err.message.includes("unauthorized") ? codes.unauthorized : codes.badRequest 
    res.status(code).json({err: true, msg: err.message})
}

module.exports = {
    handleError
}
