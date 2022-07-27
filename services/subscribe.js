const SubscribesRquest = require("../models/subscribe")



// getAllSubscribes
const getAllSubscribes = (sort = '{"createdAt" : 1}', limit = 0 , skip = 0 ,  filter = '{"name" : { "$ne": "xxxlxxx" }}') => {
    return new Promise((resolve, reject) => {

        SubscribesRquest.find({}, (errFind, Subscribes) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Subscribes.length <= 0) {
                reject("there are no Subscribes")
                return
            }

            resolve(Subscribes)


        })
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}




// get Subscribes Count
const getSubscribesCount = (filter) => {

    return new Promise((resolve, reject) => {

        SubscribesRquest.find({}, (errFind, Subscribes) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Subscribes.length <= 0) {
                reject("there are no Subscribes")
                return
            }

            resolve(Subscribes)
 

        }).count({ ...JSON.parse(filter) })

    })
}





// create Subscribe
const createSubscribe = (email) => {
    return new Promise((resolve, reject) => {
        //create
        SubscribesRquest.create({
            email
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }

             resolve(doc)
        })

    })
}


module.exports = {
    getAllSubscribes, createSubscribe , getSubscribesCount
}
