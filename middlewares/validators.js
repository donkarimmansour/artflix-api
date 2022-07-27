const {check} = require("express-validator");

const SginupValidator= [
   check("firstname").notEmpty().withMessage("firstname field is required") , 
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
   check("password").notEmpty().withMessage("password field is required") ,
   check("confirmpassword").notEmpty().withMessage("confirm password field is required") ,
   check("confirmpassword").custom((value , {req}) => {
       if(value != req.body.password) throw new Error("confirm password must be the same as password")
       else return  true
   }) ,
   check("address").notEmpty().withMessage("address field is required") ,
   check("city").notEmpty().withMessage("city field is required") ,
   check("country").notEmpty().withMessage("country field is required") ,

]

const EditValidator= [
    check("firstname").notEmpty().withMessage("firstname field is required") ,
    check("lastname").notEmpty().withMessage("lastname field is required") ,
    check("email").notEmpty().withMessage("email field is required") , 
    check("email").isEmail().withMessage("email must be email") ,
    check("address").notEmpty().withMessage("address field is required") ,
    check("city").notEmpty().withMessage("city field is required") ,
    check("country").notEmpty().withMessage("country field is required") ,
 ]

 const ImageValidator= [
   check("image").notEmpty().withMessage("image field is required") ,

]

 
const LoginValidator = [
    check("email").notEmpty().withMessage("email field is required") ,
    check("email").isEmail().withMessage("email must be email") ,
    check("password").notEmpty().withMessage("password field is required") ,
]

const resetPasswordValidator = [
    check("oldpassword").notEmpty().withMessage("old password is required"),
    check("password").notEmpty().withMessage("password is required"),
 ]

 const emailValidator = [
    check("email").notEmpty().withMessage("email field is required") ,
    check("email").isEmail().withMessage("email must be email") , ]
 const AccountSuspendedValidator = [
    check("isAccountSuspended").notEmpty().withMessage("type is required"),
 ]

 const ProductValidator = [
    check("name").notEmpty().withMessage("name field is required") ,
    check("description").notEmpty().withMessage("description field is required") ,
    check("stock").notEmpty().withMessage("stock field is required") ,
    check("price").notEmpty().withMessage("price field is required") ,
    check("info").notEmpty().withMessage("info field is required") ,
    check("images").notEmpty().withMessage("images field is required")  ,
    check("category").notEmpty().withMessage("category field is required") 
 ]

 const ReviewValidator = [
    check("feedback").notEmpty().withMessage("feedback field is required") ,
    check("rate").notEmpty().withMessage("rate field is required") ,
    check("iduser").notEmpty().withMessage("iduser field is required") ,

 ]

 const DistinctValidator = [
   check("distinct").notEmpty().withMessage("distinct field is required") ,
]


const OrdersCreateValidator = [
   check("firstname").notEmpty().withMessage("firstname field is required") ,
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
   check("address").notEmpty().withMessage("address field is required") ,
   check("city").notEmpty().withMessage("city field is required") ,
   check("country").notEmpty().withMessage("country field is required") ,
   check("userId").notEmpty().withMessage("user Id field is required") ,
   check("products").notEmpty().withMessage("products field is required") ,
   check("donation").notEmpty().withMessage("donation field is required") ,

]


const OrdersCalculateValidator = [
   check("donation").notEmpty().withMessage("donation field is required") ,
   check("products").notEmpty().withMessage("products field is required") ,
]


const wishlistCreateValidator = [
   check("productId").notEmpty().withMessage("product Id field is required") ,
   check("userId").notEmpty().withMessage("user Id field is required") , 
]

const mainCreateValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("description").notEmpty().withMessage("description field is required") ,
   check("extra").notEmpty().withMessage("extra field is required") ,
   check("btn").notEmpty().withMessage("btn field is required") ,
   check("link").notEmpty().withMessage("link field is required") ,
   check("image").notEmpty().withMessage("image field is required") ,
]

const ViewsValidator = [
   check("type").notEmpty().withMessage("type field is required") 
]

const ContactValidator = [
   check("firstname").notEmpty().withMessage("firstname field is required") ,
   check("lastname").notEmpty().withMessage("lastname field is required") ,
   check("comment").notEmpty().withMessage("comment field is required") ,
   check("email").notEmpty().withMessage("email field is required") ,
   check("email").isEmail().withMessage("email must be email") ,
]

const trackingOrderValidator = [
   check("tracking").notEmpty().withMessage("tracking field is required") ,
   check("productId").notEmpty().withMessage("product Id field is required") ,
   check("orderId").notEmpty().withMessage("order Id field is required") ,
]

const statusOrderValidator = [
   check("status").notEmpty().withMessage("status field is required") ,
   check("productId").notEmpty().withMessage("product Id field is required") ,
   check("orderId").notEmpty().withMessage("order Id field is required") ,
]


const CatyValidator = [
   check("name").notEmpty().withMessage("name field is required") ,
   check("shortDescription").notEmpty().withMessage("short Description field is required") ,
   check("fullDescription").notEmpty().withMessage("full Description field is required") ,
 //  check("type").notEmpty().withMessage("type field is required") ,
  // check("parentcategory").notEmpty().withMessage("user Id field is required") , 

]

const RuleValidator= [
   check("rule").notEmpty().withMessage("rule field is required") 
]

const ChatSendMsgValidator = [
   check("senderName").notEmpty().withMessage("senderName field is required") ,
   check("productId").notEmpty().withMessage("productId field is required") ,
   check("id").notEmpty().withMessage("id field is required") ,
   check("message").notEmpty().withMessage("message field is required") ,
   check("image").notEmpty().withMessage("image field is required") ,
]
 
const ChatSendFileValidator = [
   check("senderName").notEmpty().withMessage("senderName field is required") ,
   check("productId").notEmpty().withMessage("productId field is required") ,
   check("id").notEmpty().withMessage("id field is required") ,
   check("message").notEmpty().withMessage("message field is required") ,
   check("image").notEmpty().withMessage("image field is required") ,
   check("type").notEmpty().withMessage("userId field is required") ,
]


const ChatSeenValidator = [
   check("_id").notEmpty().withMessage("id field is required") ,
]


module.exports = {
    SginupValidator ,
    LoginValidator ,
    resetPasswordValidator ,
    emailValidator ,
    AccountSuspendedValidator ,
    EditValidator ,
    ProductValidator ,
    ReviewValidator ,
    DistinctValidator ,
    OrdersCreateValidator ,
    wishlistCreateValidator ,
    mainCreateValidator ,
    ViewsValidator,
    OrdersCalculateValidator ,
    ContactValidator ,
    ImageValidator ,
    trackingOrderValidator ,
    statusOrderValidator ,  
    CatyValidator ,
    RuleValidator ,
    ChatSendMsgValidator ,
    ChatSendFileValidator ,
    ChatSeenValidator  
}