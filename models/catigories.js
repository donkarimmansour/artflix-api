const mongoose = require("mongoose")

const CategorieSchema = mongoose.Schema({
    name: {
        type: String,
        required : true , 
        trim : true
    },
    parentcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required : false ,
         ref :"categorie" ,
    },
    shortDescription: {
        type: String,
        required : true ,
        trim : true
    },
    fullDescription: {
        type: String,
        required : true ,
        trim : true
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

const CategoriesRquest = mongoose.model("categorie", CategorieSchema)

module.exports =  CategoriesRquest