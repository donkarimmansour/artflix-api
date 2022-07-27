const CatigoriesRquest = require("../models/catigories")



// getAllCatigories
const getAllCatigories = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null, expend = null) => {
    return new Promise((resolve, reject) => {



        CatigoriesRquest.find({}, (errFind, Catigories) => {

            if (errFind) { 
                console.log(errFind); 
                reject(errFind)
                return
            }

            if (Catigories.length <= 0) {
                reject("there are no Catigories")
                return
            }

            resolve(Catigories)


        })
            .populate(expend)
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })

    })
}





// getAllCatigories tab area
const getAllCatigoriesTab = (sort = '{"updatedAt" : 1}', limit = 10000000, skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null) => {

    return new Promise((resolve, reject) => {


        CatigoriesRquest.aggregate([
            { $match: { ...JSON.parse(filter) } },
            { $lookup: { from: `categories`, localField: `parentcategory`, foreignField: "_id", as: `parentcategory` } },
            { $unwind: "$parentcategory" },
            { $group: { "_id": `$$ROOT.parentcategory._id`, "name": { "$push": "$$ROOT.parentcategory.name" }, "categories": { "$push": { "category": "$$ROOT" } } } },
            { $project: { categories: { $slice: ["$categories", parseInt(limit)] } , name: { $slice: ["$name", parseInt(limit)] }  } },
            { $skip: parseInt(skip) },
            { $sort: JSON.parse(sort) },

        ]).exec((errFind, Categories) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Categories.length <= 0) {
                reject("there are no Categories")
                return
            }

            resolve(Categories)


        })



    })
}




// get Caty Count
const getCatyCount = (filter) => {

    return new Promise((resolve, reject) => {

        CatigoriesRquest.find({}, (errFind, Categories) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Categories.length <= 0) {
                reject("there are no Categories")
                return
            }

            resolve(Categories)
 

        }).count({ ...JSON.parse(filter) })

    })
}


// create Catigorie
const createCatigorie = ( name , fullDescription , shortDescription , parentcategory) => {
    return new Promise((resolve, reject) => {

        let caty = { name , fullDescription , shortDescription }
        if (parentcategory != "" && parentcategory != null) {
            caty = { ...caty, parentcategory }
        }


        //create
        CatigoriesRquest.create({
            ...caty
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }
               resolve(doc._id)
        })

    })
}    
 

// update Catigorie
const editCatigorie = (id,  name , fullDescription , shortDescription , parentcategory) => {

    let catys = {  name , fullDescription , shortDescription  }

    if (parentcategory != "" && parentcategory != null) {
        catys = { ...catys, parentcategory }
    }

    return new Promise((resolve, reject) => {

        // check id
        CatigoriesRquest.findOne({}, (errFind, caty) => {
            if (errFind)
                reject(errFind)

            if (!caty) {
                reject("id not exist")

            } else {

                //update

                CatigoriesRquest.updateOne({}, {
                    ...catys
                    , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                         resolve("modifed")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}



// delete Catigorie
const deleteCatigorie = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        CatigoriesRquest.findOne({}, (errFind, caty) => {
            if (errFind)
                reject(errFind)

            if (!caty) {
                reject("id not exist")

            } else {
                //delete
                CatigoriesRquest.deleteOne({}
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




// duplicate Catigorie
const duplicateCatigorie = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        CatigoriesRquest.findOne({}, (errFind, caty) => {
            if (errFind)
                reject(errFind)

            if (!caty) {
                reject("id not exist")

            } else {

                if (delete caty._doc._id) {

                    CatigoriesRquest.create({ ...caty._doc, updatedAt: Date.now(), createdAt: Date.now() }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve(doc._doc._id)

                        })

                    } else {
                        reject("something went wrong")
                    }

            }//else
        }).where("_id").equals(id)

    })
}

module.exports = {
    getAllCatigories, deleteCatigorie, editCatigorie, createCatigorie,
    duplicateCatigorie, getAllCatigoriesTab , getCatyCount
}
