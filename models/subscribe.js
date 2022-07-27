const mongoose = require("mongoose")

const SubscribeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const SubscribesRquest = mongoose.model("subscribe", SubscribeSchema)

module.exports =  SubscribesRquest