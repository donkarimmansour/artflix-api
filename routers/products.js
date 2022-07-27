const ProductsControlles = require("../controlles/products")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {ProductValidator , ReviewValidator, DistinctValidator , ViewsValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.ProductsEndpoints.list //, passport.authenticate("userOradmin", {session: false}) 
,  ProductsControlles.getAllProducts , handleError)


// count
router.get(ApiEndpoints.ProductsEndpoints.count //, passport.authenticate("userOradmin", {session: false}) 
,  ProductsControlles.getProductsCount , handleError)

// getall tab
router.get(ApiEndpoints.ProductsEndpoints.listtab //, passport.authenticate("userOradmin", {session: false}) 
,  ProductsControlles.getAllProductsTab , handleError)

// Distinct
router.post(ApiEndpoints.ProductsEndpoints.distinct //, passport.authenticate("userOradmin", {session: false}) 
, DistinctValidator , HandleValidatorError , ProductsControlles.getAllDistinct , handleError)

// create
router.post(ApiEndpoints.ProductsEndpoints.create   , passport.authenticate("admin", {session: false}), ProductValidator ,  HandleValidatorError , ProductsControlles.createProduct , handleError)

// update
router.put(ApiEndpoints.ProductsEndpoints.edit , passport.authenticate("admin", {session: false}) , ProductValidator , idValidator, HandleValidatorError , ProductsControlles.editProduct , handleError)

// reviews
router.put(ApiEndpoints.ProductsEndpoints.review , passport.authenticate("user", {session: false}) 
, ReviewValidator , idValidator, HandleValidatorError , ProductsControlles.reviewProduct , handleError)

// delete
router.delete(ApiEndpoints.ProductsEndpoints.delete , passport.authenticate("admin", {session: false}), idValidator , ProductsControlles.deleteProduct , handleError)

// duplicate
router.post(ApiEndpoints.ProductsEndpoints.duplicate, passport.authenticate("admin", {session: false}) , idValidator , ProductsControlles.duplicateProduct , handleError)

// update Views
router.put(ApiEndpoints.ProductsEndpoints.views , ViewsValidator , idValidator, HandleValidatorError , ProductsControlles.updateViews )

// aliexpress clone
router.post(ApiEndpoints.ProductsEndpoints.aliexpress , passport.authenticate("admin", {session: false}), idValidator , ProductsControlles.aliexpress , handleError)


module.exports = router