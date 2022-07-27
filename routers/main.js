const MainsControlles = require("../controlles/main")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const { mainCreateValidator} = require("../middlewares/validators")

// getall 
router.get(ApiEndpoints.MainEndpoints.list //, passport.authenticate("userOradmin", {session: false}) 
,  MainsControlles.getAllMains , handleError)


// count
router.get(ApiEndpoints.MainEndpoints.count , passport.authenticate("admin", {session: false}) 
,  MainsControlles.getMainsCount , handleError)


// create
router.post(ApiEndpoints.MainEndpoints.create  , passport.authenticate("admin", {session: false}), mainCreateValidator ,  HandleValidatorError , MainsControlles.createMain , handleError)

// update
router.put(ApiEndpoints.MainEndpoints.edit , passport.authenticate("admin", {session: false}) , mainCreateValidator , idValidator, HandleValidatorError , MainsControlles.editMain , handleError)

// delete 
router.delete(ApiEndpoints.MainEndpoints.delete , passport.authenticate("admin", {session: false}), idValidator , MainsControlles.deleteMain , handleError)

// duplicate
router.post(ApiEndpoints.MainEndpoints.duplicate, passport.authenticate("admin", {session: false}) , idValidator , MainsControlles.duplicateMain , handleError)


module.exports = router