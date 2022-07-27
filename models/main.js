const mongoose = require("mongoose")

const MainSchema = mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim : true
    },
    description: {
        type: String,
        required : true,
        trim : true
    },
    extra: {
        type: String,
        required : true,
        trim : true
    },
    btn: {
        type: String,
        required : true,
        trim : true
    },
    link: {
        type: String,
        required : true,
        trim : true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "file" ,
        required : true,
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

const MainsRquest = mongoose.model("main", MainSchema)

module.exports =  MainsRquest