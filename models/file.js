const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    imageUrl: {
        type: String,
        required: false,
        trim: true,
    },
    imagesUrl: {
        type: Array,
        required: true,
    },
    type : { 
        type: String,
        required: false, 
        enum : ["array" , "single"] ,
        default : "single",
    } ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const fileRquest = mongoose.model("file", fileSchema)



module.exports = fileRquest