const {check} = require("express-validator")
const {handleError} = require("../middlewares/handleErrors")
const {idValidator} = require("../middlewares/idValidator")
const {HandleValidatorError} = require("../middlewares/handleValidatorError")
const passport = require("passport")
const {ApiEndpoints ,} = require("../common/apiEndpoints")

module.exports = {
    check ,
    handleError ,
    idValidator ,
    passport ,
    ApiEndpoints ,
    HandleValidatorError 
}