const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        trim: true,
        default : "62d85c889baf3cc9640f7904" ,
        ref : "file"
    },
    phone: {
        type: String,
        required: false,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    postcode: {
        type: String,
        required: false,
        trim: true,
    },
    state: { 
        type: String,
        required: false,
        trim: true,
    },
    rule: { 
        type: String,
        required: false,
        enum : ["admin" , "user"] ,
        default : "user"
    },
    shippingaddress: {
        type: {
            firstname : { type : String }  , lastname : { type : String } , email  : { type : String }  ,
            phone : { type : String } , address :  { type : String } , country :  { type : String } ,
            city :  { type : String } , postcode :  { type : String } , state :  { type : String } 
        },
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    } ,
    isAccountSuspended: {
        type: Boolean,
        default: false
    }
})

// hash Password
UserSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const UsersRquest = mongoose.model("user", UserSchema)



module.exports =  UsersRquest