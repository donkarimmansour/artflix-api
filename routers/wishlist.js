const WishlistsControlles = require("../controlles/wishlist")
const {  handleError , idValidator , passport , ApiEndpoints , HandleValidatorError} = require("../common/routersImports")
const router = require("express").Router()
const {wishlistCreateValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.wishlistEndpoints.list , passport.authenticate("userOradmin", {session: false}) 
,  WishlistsControlles.getAllWishlists , handleError)

// count
router.get(ApiEndpoints.wishlistEndpoints.count , passport.authenticate("admin", {session: false}) 
,  WishlistsControlles.getWishlistCount , handleError)

// create
router.post(ApiEndpoints.wishlistEndpoints.create   , passport.authenticate("userOradmin", {session: false}), wishlistCreateValidator ,  HandleValidatorError , WishlistsControlles.createWishlist , handleError)

// delete
router.delete(ApiEndpoints.wishlistEndpoints.delete , passport.authenticate("userOradmin", {session: false}), idValidator , WishlistsControlles.deleteWishlist , handleError)

 
module.exports = router