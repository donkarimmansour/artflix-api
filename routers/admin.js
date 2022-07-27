const AdminControlles = require("../controlles/admin")
const {ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {LoginValidator } = require("../middlewares/validators")


// login
router.post(ApiEndpoints.UserEndpoints.login, LoginValidator ,  HandleValidatorError , AdminControlles.login)


module.exports = router