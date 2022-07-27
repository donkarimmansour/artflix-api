const SubscribesControlles = require("../controlles/subscribe")
const { ApiEndpoints , HandleValidatorError , handleError , passport} = require("../common/routersImports")
const router = require("express").Router()
const {emailValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.SubscribeEndpoints.list , passport.authenticate("admin", {session: false})  ,  SubscribesControlles.getAllSubscribes , handleError)

// count
router.get(ApiEndpoints.SubscribeEndpoints.count , passport.authenticate("admin", {session: false}) 
,  SubscribesControlles.getSubscribesCount , handleError)

// create
router.post(ApiEndpoints.SubscribeEndpoints.create  , emailValidator ,  HandleValidatorError , SubscribesControlles.createSubscribe )

 
module.exports = router