const mongoose = require("mongoose")

const WishlistSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true , 
        ref : "product"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true , 
        ref : "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const WishlistsRquest = mongoose.model("favorite", WishlistSchema)

module.exports =  WishlistsRquest