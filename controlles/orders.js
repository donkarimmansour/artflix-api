const OrdersModel = require("../services/orders")
const codes = require("../common/codes")



// get All Orders 
const getAllOrders = (req, res) => { 
    const { sort , limit , skip , filter ,  select , expend} = req.query ;

    OrdersModel.getAllOrders( sort , limit , skip , filter ,  select , expend).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}



// get Orders  Count
const getOrdersCount = (req, res) => { 
    const { filter} = req.query ;

    OrdersModel.getOrdersCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Order
const createOrder = (req, res) => {
    const { userId, firstname, lastname, email, phone, address,
        country, city, postcode, state, comment, donation,
        products, transactionId, transactionState } = req.body;

    OrdersModel.createOrder(userId, firstname, lastname, email, phone, address,
        country, city, postcode, state, comment, donation,
        products, transactionId, transactionState).then(result => {
            res.status(codes.ok).json({ err: false, msg: result })
            
        }).catch(result => {
            res.status(codes.badRequest).json({ err: true, msg: result })
        })
}

// calculate Order
const calculateOrder = (req, res) => {
    const {donation , products} = req.body ;
    OrdersModel.calculateOrder(donation , products).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// delete Order
const deleteOrder = (req, res) => {
    const {id} = req.params ;

    OrdersModel.deleteOrder(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// duplicate Order
const duplicateOrder = (req, res) => {
    const {id} = req.params ;

    OrdersModel.duplicateOrder(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// update Order Status
const updateOrderStatus = (req, res) => {
    const {orderId , productId , status} = req.body ;

    OrdersModel.updateOrderStatus(orderId , productId , status).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// update Order Tracking
const updateOrderTracking = (req, res) => {
    const {orderId , productId , tracking} = req.body ;

    OrdersModel.updateOrderTracking(orderId , productId , tracking).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllOrders , deleteOrder  , createOrder , getOrdersCount ,
    duplicateOrder , calculateOrder , updateOrderStatus , updateOrderTracking
}