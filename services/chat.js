const ChatsRquest = require("../models/chat")

  
const getFriends = () => {

    return  new Promise((resolve, reject) => {

        ChatsRquest.aggregate([
            { "$group": { "_id" : "$id" , chatId : { $last: "$$ROOT" }  } },
        ], async (errFind, Friends) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Friends.length <= 0) {
                reject("there are no Friends")
                return
            }


            resolve(Friends)

        })


   
      })
}




const getMessage = (p , id) => {


    return  new Promise((resolve, reject) => {

        const query = p === "a" ?  {id} : {id , productId : p}


        ChatsRquest.find(query, (errFind, Messages) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Messages.length <= 0) {
                reject("there are no Messages")
                return
            }

            resolve(Messages)
            
        })
    })

}
 

const sendMessage = (senderName , productId , userId , id  , message , image , from) => {

    return  new Promise((resolve, reject) => {
   
        ChatsRquest.create({
            senderName , productId , userId , id  , message : { text : message } , image , from
        }, (errCreate, Message) => {

            if (errCreate) {
                reject(errCreate)
                return
            }

            resolve(Message._doc)
        })
    })

    
 
}



const sendImageMessage = (senderName , productId , userId , id  , message , image , from , type) => {


    return  new Promise((resolve, reject) => {

        ChatsRquest.create({
            senderName, productId, userId, id, image, from, type,
            message: {
                text: '',
                image: message,
                type
            }
        }, (errCreate, Message) => {

            if (errCreate) {
                reject(errCreate)
                return
            }

            resolve(Message._doc)
        })
    })


}

const messageSeen = (messageId) => {


    return  new Promise((resolve, reject) => {

        ChatsRquest.findByIdAndUpdate(messageId , {status: 'seen'} , (errUpdate, Message) => {

            if (errUpdate) {
                reject(errUpdate)
                return
            }
            
            resolve({ success: true })
           
            
        })
    })

}

const delivaredMessage = (messageId) => {


    return  new Promise((resolve, reject) => {

        ChatsRquest.findByIdAndUpdate(messageId , {status: 'delivared'} , (errUpdate, Message) => {

            if (errUpdate) {
                reject(errUpdate)
                return
            }

        
                resolve({ success: true })
            
        })
    })

}




module.exports = {
    getFriends  , getMessage , sendImageMessage , messageSeen , delivaredMessage , sendMessage
}