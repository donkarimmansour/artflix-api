const SubscribesModel = require("../services/subscribe")
const codes = require("../common/codes")



// get All Subscribes 
const getAllSubscribes = (req, res) => { 
    const { sort , limit , skip , filter} = req.query ;

    SubscribesModel.getAllSubscribes( sort , limit , skip , filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get Subscribes Count
const getSubscribesCount = (req, res) => { 
    const { filter} = req.query ;

    SubscribesModel.getSubscribesCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Subscribe
const createSubscribe = (req, res) => {
    const {email} = req.body ;
    SubscribesModel.createSubscribe(email).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllSubscribes , createSubscribe , getSubscribesCount
}