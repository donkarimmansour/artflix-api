const ChatsControlles = require("../controlles/chat")
const { ApiEndpoints , HandleValidatorError  , idValidator , handleError , passport} = require("../common/routersImports")
const router = require("express").Router()
const {ChatSeenValidator , ChatSendFileValidator , ChatSendMsgValidator} = require("../middlewares/validators")

// get-friends
router.get(ApiEndpoints.ChatEndpoints.getFriends , passport.authenticate("admin", {session: false})   ,  ChatsControlles.getFriends , handleError  )

// get-message
router.get(ApiEndpoints.ChatEndpoints.getMessage , idValidator , idPValidator ,  ChatsControlles.getMessage  )

// send message 
router.post(ApiEndpoints.ChatEndpoints.sendMessage  , ChatSendMsgValidator ,  HandleValidatorError , ChatsControlles.sendMessage )

// image message send
router.post(ApiEndpoints.ChatEndpoints.imageMessageSend  , ChatSendFileValidator ,  HandleValidatorError , ChatsControlles.sendImageMessage )

// seen message
router.put(ApiEndpoints.ChatEndpoints.seenMessage  , ChatSeenValidator ,  HandleValidatorError , ChatsControlles.messageSeen )

 
// delivared message
router.put(ApiEndpoints.ChatEndpoints.delivaredMessage  , ChatSeenValidator ,  HandleValidatorError , ChatsControlles.delivaredMessage )

//params Validator
function idPValidator(req, res, next) {
    const { p } = req.params
 
    if (p == "" || p == null) {
        res.status(codes.badRequest).json({err: true, msg: "id not exist"})
        return
    }

    next()
}


module.exports = router