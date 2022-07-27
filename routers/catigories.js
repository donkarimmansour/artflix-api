const CatigoriesControlles = require("../controlles/catigories")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {CatyValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.CatyEndpoints.list //, passport.authenticate("userOradmin", {session: false}) 
,  CatigoriesControlles.getAllCatigories , handleError)

// getall tab
router.get(ApiEndpoints.CatyEndpoints.listtab //, passport.authenticate("userOradmin", {session: false}) 
,  CatigoriesControlles.getAllCatigoriesTab , handleError)

// count
router.get(ApiEndpoints.CatyEndpoints.count , passport.authenticate("admin", {session: false}) 
,  CatigoriesControlles.getCatyCount , handleError)
 
// create
router.post(ApiEndpoints.CatyEndpoints.create   , passport.authenticate("admin", {session: false}), CatyValidator ,  HandleValidatorError , CatigoriesControlles.createCatigorie , handleError)

// update
router.put(ApiEndpoints.CatyEndpoints.edit , passport.authenticate("admin", {session: false}) , CatyValidator , idValidator, HandleValidatorError , CatigoriesControlles.editCatigorie , handleError)

// delete
router.delete(ApiEndpoints.CatyEndpoints.delete , passport.authenticate("admin", {session: false}), idValidator , CatigoriesControlles.deleteCatigorie , handleError)

// duplicate
router.post(ApiEndpoints.CatyEndpoints.duplicate, passport.authenticate("admin", {session: false}) , idValidator , CatigoriesControlles.duplicateCatigorie , handleError)


module.exports = router