const Servs = require('../services/chat');

const codes = {
    ok : 200 ,
    badRequest : 200 ,
}
 
const getFriends = async (req, res) => {

    Servs.getFriends().then(result => {
        res.status(codes.ok).json({err: false, msg : result})
     }).catch(result => {
         res.status(codes.badRequest).json({err: true, msg : result})
     })

} 

const sendMessage = async (req, res) => {
    const { senderName , productId , userId , id  , message , image , from} = req.body;

    Servs.sendMessage( senderName , productId , userId , id  , message , image , from ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const getMessage = async (req, res) => {

    const {p , id} = req.params;

    Servs.getMessage( p , id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const sendImageMessage = (req, res) => {
    const { senderName , productId , userId , id  , message , image , from , type} = req.body;

    Servs.sendImageMessage(senderName , productId , userId , id  , message , image , from , type).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
 
}

const messageSeen = async (req, res) => {
    const { _id  } = req.body;

    Servs.messageSeen( _id ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const delivaredMessage = async (req, res) => {
    const { _id  } = req.body;

    Servs.delivaredMessage( _id ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}




module.exports = {
    getFriends  , getMessage , sendImageMessage , messageSeen , delivaredMessage , sendMessage 
}