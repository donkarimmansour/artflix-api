const { ObjectID } = require("mongodb")
const OrdersRquest = require("../models/orders")
const ProductsRquest = require("../models/products")
const paypal = require('@paypal/checkout-server-sdk');

 

 
// getAllOrders
const getAllOrders = (sort = '{"updatedAt" : 1}', limit = 0 , skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null , expend = null) => {
    return new Promise((resolve, reject) => {

        const newExpend = 
        (expend == "images") ? { path: 'orders', populate: {path : "images" , model : "file"} } : 
        (expend == "productId") ? { path: 'orders', populate: {path : "productId" , model : "product"} } :
        // (expend == "images-productId") ? [{ path: 'orders', populate: {path : "images" , model : "file"} } , { path: 'orders', populate: {path : "productId" , model : "product"} }] :
        // (expend == "user-images") ? [{ path: 'orders', populate: {path : "images" , model : "file"} } , { path: 'userId', model : "user" }] :
        (expend == "userId") ? { path: 'userId', model : "user" } : expend 

        OrdersRquest.find({}, (errFind, Orders) => {
 
            if (errFind) {console.log(errFind);
                
                reject(errFind)
                return
            }

            if (Orders.length <= 0) {
                reject("there are no Orders")
                return
            }

            resolve(Orders)


        })
            .populate(newExpend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })



    })
}





// get Orders Count
const getOrdersCount = (filter) => {

    return new Promise((resolve, reject) => {

        OrdersRquest.find({}, (errFind, Orders) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Orders.length <= 0) {
                reject("there are no Orders")
                return
            }

            resolve(Orders)
 

        }).count({ ...JSON.parse(filter) })

    })
}




// create Order
const createOrder = (userId , firstname , lastname ,email , phone, address ,
    country , city , postcode , state , comment , donation ,
     products  ,  transactionId , transactionState) => {
    return new Promise((resolve, reject) => {

         const ids = products.map(p => ObjectID(p.product._id))
         let orders = []
        
        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Products.length <= 0) { 
                reject("there are no Products") 
                return
            }


            Products.map((p, i) => {

                let shippingCost = 0
                let shippingName = ""
                let SizePrice = 0
                let index = products.findIndex(f => p._id == f.product._id)


                if (index != -1) {
                    if (p.size.length > 0) {
                        p.size.map(s => {
                            if (s.size == products[index].size) {
                                SizePrice = s.price
                                return
                            }
                        })
                    } else {
                        SizePrice = p.price
                    }
                    if (p.shipping.length > 0) {
                        p.shipping.map(s => {
                            if (s.name == products[index].shipping) {
                                shippingCost = s.price
                                shippingName = s.name
                                return
                            }
                        })
                    } else {
                        shippingCost = 0
                        shippingName = "free"
                    }

                   

                    orders.push({productId : p._id , name : p.name , images : p.images , shipping : { price : shippingCost , name : shippingName }, price : SizePrice, quantity : products[index].quantity ,
                        size :  products[index].size , color : products[index].color , status : "designing" , tracking : "waiting"})
                    }

                     
            })

                 const shippingaddress = {
                    firstname , lastname ,email  , phone, address , country , city , postcode , state
                 }
 
                   //create
                   OrdersRquest.create({
                       orders, shippingaddress, userId, donation, comment ,  transactionId , transactionState
                   }, (errCreate, doc) => {
                       if (errCreate) {
                           reject(errCreate)
                           return
                       }

                       resolve(doc._doc._id)
                   })

        }).where("_id").equals(ids)
  })
}



// calculate Order
const calculateOrder = (donation , products) => {
    return new Promise((resolve, reject) => {

         const ids = products.map(p => ObjectID(p.product._id))

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Products.length <= 0) {  
                reject("there are no Products") 
                return
            }

            let total = donation
            let orders = []

            Products.map((p, i) => {

            let shippingCost = 0
            let shippingName = ""
            let SizePrice = 0
            let index = products.findIndex(f => p._id == f.product._id)


            if (index != -1) {


                if (p.size.length > 0) {
                    p.size.map(s => {
                        if (s.size == products[index].size) {
                            SizePrice = s.price
                            return
                        }
                    })
                } else {
                    SizePrice = p.price
                }


                if (p.shipping.length > 0) {
                    p.shipping.map(s => {
                        if (s.name == products[index].shipping) {
                            shippingCost = s.price
                            shippingName = s.name
                            return
                        }
                    })
                } else {
                    shippingCost = 0
                    shippingName = "free"
                }

                let newprice = SizePrice + shippingCost
                newprice = parseFloat(newprice.toFixed(2)) 
                total += newprice * products[index].quantity

                  orders.push({name : p.name , quantity : products[index].quantity , unit_amount : { currency_code : "USD" , value : newprice}})

                }
                    
            })

           orders.push({name : "donation" , quantity : 1 , unit_amount : { currency_code : "USD" , value : donation}})

           console.log("end total => " , total);


            const request = new paypal.orders.OrdersCreateRequest()
            request.prefer("return=representation")
            
            request.requestBody({
                intent : "CAPTURE" ,
                purchase_units : [
                    { amount: 
                    {
                        currency_code: "USD", value: total ,
                        breakdown: {
                            item_total: {
                                currency_code: "USD", value: total
                            }
                        }
                    },
                    
                    items : orders ,
                
                  } , 
                ]
            })


            const client = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
                "AVfBH8_oADMB-IZX7qtZuWz0N7dPVS6K1dC42EYYzJnKiydm8CzhPdoxmn41QB4uRRSciPb7q8GJnNK1" ,
                "ENPfR3UvCvFefBsM3T_6hNNyljgD-NerovrYf48O2iSYESRQgOEHQrUGA8e5WsoBEbDrnLn5hi3_Knzc"
            ))

            client.execute(request).then(res => {
                resolve(res)

            }).catch(err => {
                reject(err)
            })

       }).where("_id").equals(ids)
  })
}


// delete Order
const deleteOrder = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        OrdersRquest.findOne({}, (errFind, ordr) => {
            if (errFind)
                reject(errFind)

            if (!ordr) {
                reject("id not exist")

            } else {
                //delete
                OrdersRquest.deleteOne({}
                    , (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                            return
                        }

                        if (doc.deletedCount > 0) {
                            resolve("deleted")

                        } else {
                            reject("something went wrong")
                        }

                    }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}




// duplicate Order
const duplicateOrder = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        OrdersRquest.findOne({}, (errFind, ordr) => {
            if (errFind)
                reject(errFind)

            if (!ordr) {
                reject("id not exist")

            } else {

                if(delete ordr._doc._id){
          

                    OrdersRquest.create({...ordr._doc , updatedAt: Date.now() , createdAt : Date.now() }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve("duplicated")
                    })

                }else{
                    reject("something went wrong")

                }
                

            }//else
        }).where("_id").equals(id)
 
    })
}


// update order status
const updateOrderStatus = (orderId, productId, status) => {

    return new Promise((resolve, reject) => {


        OrdersRquest.findOne({}, (errFind, order) => {

            if (errFind) {
                console.log(errFind);
                reject(errFind)
                return
            }

            if (!order) {
                reject("there are no Orders")
                return
            }

            const index = order.orders.findIndex(o => productId == o.productId)


            if (index != -1) {
                order.orders[index].status = status

                OrdersRquest.updateOne({}, order, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(orderId)

            }


        }).where("_id").equals(orderId)
    })
}


// update order tracking
const updateOrderTracking = (orderId, productId, tracking) => {
    return new Promise((resolve, reject) => {


        OrdersRquest.findOne({}, (errFind, order) => {

            if (errFind) {
                console.log(errFind);
                reject(errFind)
                return
            }

            if (!order) {
                reject("there are no Orders")
                return
            }

            const index = order.orders.findIndex(o => productId == o.productId)

            if (index != -1) {
                order.orders[index].tracking = tracking

                OrdersRquest.updateOne({}, order, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(orderId)

            }


        }).where("_id").equals(orderId)
    })
}


module.exports = {
    getAllOrders, deleteOrder, createOrder, getOrdersCount ,
     duplicateOrder , calculateOrder , updateOrderStatus , updateOrderTracking
}
