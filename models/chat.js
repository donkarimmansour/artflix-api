const mongoose = require('mongoose');

const chatSchema = mongoose.Schema ({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user" ,
        required : false ,
        default: null
    },
    id : {
        type: String,
        required : true ,
        default: null
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "product" ,
        required : true ,
    },
    image : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "file" ,
        required : true ,
    },
    senderName : {
        type : String,
        required : true
    },
    from : {
        type : String,
         enum : ["user" , "admin" ] ,
         default : 'user'
    } ,
    message : {
        text : {
            type : String,
            default : ''
        }, 
        image: {
            type: mongoose.Schema.Types.ObjectId,
             ref : "file" ,
             required : false ,
             default: null
        },
        type : {
            type : String,
            // enum : ["file" , "img " , "msg"] ,
            default : 'msg'
        } 
    },
    status : {
        type : String,
        default : 'unseen'
    }
},{timestamps : true})

const ChatsRquest = mongoose.model("chat", chatSchema)

module.exports =  ChatsRquest