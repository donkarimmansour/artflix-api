const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required : true , 
        trim : true
    },
    description: {
        type: String,
        required : true , 
        trim : true
    },
    stock: {
        type: Number,
        required : true 
    },
    oldprice: {
        type: Number,
        required : false
    },
    price: {
        type: Number,
        required : true 
    },
    condition: {
        type: String,
        required : false , 
        trim : false ,
        enum : ["new" , "old"] ,
        default : "old"
    },
    status: {
        type: String,
        required : false , 
        trim : true ,
        enum : ["published" , "draft"] ,
        default : "published"
    },
    limitedAtt: {
        type: Date,
        required : false , 
        trim : true
    },
    color: {
        type: Array,
        required : false 
    },
    size: {
        type: Array, // { size , price }
        required : false 
    }, 
    
    shipping: {
        type: Array, // { size , price }
        required : false 
    },

    reviews: {
        type: Array, // { id , feedback, rate }
        required : false 
    },
    // images: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     required : true ,
    //     ref : "file"
    // }, 
    images: {
        type: Array, 
        required : true ,
    }, 
    category: {
        type: String, 
        required : true ,
        trim : true ,
    },
    viewcount: {
        type: Number,
        required : false
    },
    soldcount: {
        type: Number,
        required : false
    },
    info: {
        type: Object, //{wieght, color, dimensios}
        required : true
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

const ProductsRquest = mongoose.model("product", ProductSchema)

module.exports =  ProductsRquest