const codes = require("../common/codes");

//params Validator
function idValidator(req, res, next) {
    const { id } = req.params

    if (id == "" || id == null) {
        res.status(codes.badRequest).json({err: true, msg: "id not exist"})
        return
    }

    next()
}

module.exports = {
    idValidator
}
