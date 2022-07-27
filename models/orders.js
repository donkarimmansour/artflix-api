const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    orders: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required : true , 
        ref : "user"
    },
    donation: {
        type: Number,
        required : true  ,
        trim : true
    },
    comment: {
        type: String,
        required : false  ,
        trim : true
    },
    transactionId: {
        type: String,
        required : false  ,
        trim : true
    },
    transactionState: {
        type: String,
        required : false  ,
        trim : true
    },
    shippingaddress: {
        type: {
            firstname : { type : String }  , lastname : { type : String } , email  : { type : String }  ,
            phone : { type : String } , address :  { type : String } , country :  { type : String } ,
            city :  { type : String } , postcode :  { type : String } , state :  { type : String } 
        },
        required: true,
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

const OrdersRquest = mongoose.model("order", OrderSchema)

module.exports =  OrdersRquest