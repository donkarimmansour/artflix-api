const {validationResult} = require("express-validator");
const codes = require("../common/codes");

const HandleValidatorError = (req , res , next) => {
    let errors = validationResult(req)
    const hasErrors = !errors.isEmpty()
    if(hasErrors){
        errors = errors.array().map(err => err.msg)
        res.status(codes.badRequest).json({err : true , msg : errors})
        return
    }
    next()
}

module.exports = {
    HandleValidatorError
}