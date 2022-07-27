const WishlistsModel = require("../services/wishlist")
const codes = require("../common/codes")



// get All Wishlists 
const getAllWishlists = (req, res) => { 
    const { sort , limit , skip , filter ,  select , expend} = req.query ;

    WishlistsModel.getAllWishlists( sort , limit , skip , filter ,  select , expend).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// get Wishlist Count
const getWishlistCount = (req, res) => { 
    const { filter} = req.query ;

    WishlistsModel.getWishlistCount(filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Wishlist
const createWishlist = (req, res) => {
    const {userId , productId } = req.body ;
    WishlistsModel.createWishlist(userId , productId).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}



// delete Wishlist
const deleteWishlist = (req, res) => {
    const {id} = req.params ;

    WishlistsModel.deleteWishlist(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllWishlists , deleteWishlist  , createWishlist  , getWishlistCount
}