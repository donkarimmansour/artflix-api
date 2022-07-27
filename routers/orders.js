const OrdersControlles = require("../controlles/orders")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {OrdersCreateValidator , OrdersCalculateValidator, trackingOrderValidator, statusOrderValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.OrdersEndpoints.list , passport.authenticate("userOradmin", {session: false}) 
,  OrdersControlles.getAllOrders , handleError)

// count
router.get(ApiEndpoints.OrdersEndpoints.count , passport.authenticate("admin", {session: false}) 
,  OrdersControlles.getOrdersCount , handleError)


// create
router.post(ApiEndpoints.OrdersEndpoints.create   , passport.authenticate("userOradmin", {session: false}), OrdersCreateValidator ,  HandleValidatorError , OrdersControlles.createOrder , handleError)


// calculate
router.post(ApiEndpoints.OrdersEndpoints.calculate   , passport.authenticate("userOradmin", {session: false}), OrdersCalculateValidator ,  HandleValidatorError , OrdersControlles.calculateOrder , handleError)

// delete
router.delete(ApiEndpoints.OrdersEndpoints.delete , passport.authenticate("admin", {session: false}), idValidator , OrdersControlles.deleteOrder , handleError)

// duplicate
router.post(ApiEndpoints.OrdersEndpoints.duplicate, passport.authenticate("admin", {session: false}) , idValidator , OrdersControlles.duplicateOrder , handleError)


// tracking
router.put(ApiEndpoints.OrdersEndpoints.tracking  , passport.authenticate("admin", {session: false})  , trackingOrderValidator , HandleValidatorError , OrdersControlles.updateOrderTracking , handleError)

//status
router.put(ApiEndpoints.OrdersEndpoints.status, passport.authenticate("admin", {session: false}) , statusOrderValidator , HandleValidatorError , OrdersControlles.updateOrderStatus , handleError)


module.exports = router