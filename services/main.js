const MainsRquest = require("../models/main")



// getAllMains
const getAllMains = (sort = '{"updatedAt" : 1}', limit = 0 , skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null , expend = null) => {
    return new Promise((resolve, reject) => {

        MainsRquest.find({}, (errFind, Mains) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Mains.length <= 0) {
                reject("there are no Mains")
                return
            }

            resolve(Mains)


        })
            .populate(expend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })



    })
}



// get Mains Count
const getMainsCount = (filter) => {

    return new Promise((resolve, reject) => {

        MainsRquest.find({}, (errFind, Mains) => {

            if (errFind) {
                reject(errFind)
                return 
            }

            if (Mains.length <= 0) {
                reject("there are no Mains")
                return
            }

            resolve(Mains)
 

        }).count({ ...JSON.parse(filter) })

    })
}






// create Main
const createMain = (name,description, extra , btn , link , image) => {
    return new Promise((resolve, reject) => {
        //create
        MainsRquest.create({
            name,description, extra , btn , link , image
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }

             resolve(doc._id)
        })

    })
}


// update Main
const editMain = (id,name,description, extra , btn , link , image) => {

    return new Promise((resolve, reject) => {

        // check id
        MainsRquest.findOne({}, (errFind, main) => {
            if (errFind)
                reject(errFind)

            if (!main) {
                reject("id not exist")

            } else {

                //update

                MainsRquest.updateOne({}, {
                     name,description, extra , btn , link , image
                    , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {

                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}



// delete Main
const deleteMain = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        MainsRquest.findOne({}, (errFind, main) => {
            if (errFind)
                reject(errFind)

            if (!main) {
                reject("id not exist")

            } else {
                //delete
                MainsRquest.deleteOne({}
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




// duplicate Main
const duplicateMain = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        MainsRquest.findOne({}, (errFind, main) => {
            if (errFind)
                reject(errFind)

            if (!main) {
                reject("id not exist")

            } else {

                if(delete main._doc._id){
          

                    MainsRquest.create({...main._doc , updatedAt: Date.now() , createdAt : Date.now() }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve(doc._id)
                    })

                }else{
                    reject("something went wrong")

                }
                

            }//else
        }).where("_id").equals(id)
 
    })
}

module.exports = {
    getAllMains, deleteMain, editMain, createMain,
     duplicateMain , getMainsCount
}
