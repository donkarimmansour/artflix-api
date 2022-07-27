const fs = require("fs")
const fileRquest = require("../models/file")


//create Single File
const createSingleFile = (imageUrl) => {

    return new Promise((resolve, reject) => { 

            fileRquest.create({
               imageUrl
            }, (errCreate, doc) => { 
                if (errCreate) {

                    if (fs.existsSync("./public/images/" + imageUrl)) {
                         fs.unlink("./public/images/" + imageUrl, () => { })
                    }

                    reject(errCreate)
                    return
                }

                resolve(doc["_id"])
            })
                
    })
}


//create Multiple Files

const createMultipleFiles = (imagesUrl) => {

    return new Promise((resolve, reject) => {

            fileRquest.create({
               imagesUrl , type : "array"
            }, (errCreate, doc) => {
                if (errCreate) {
                       
                    imagesUrl.forEach(img => {
                        if (fs.existsSync("./public/images/" + img)) {
                         fs.unlink("./public/images/" + img, () => { })
                        }
                    });

                    reject(errCreate)
                    return
                }

                resolve(doc["_id"])
            })
                
    })
}


//get Single File
const getSingleFile = (id) => {

    return new Promise((resolve, reject) => { 

            fileRquest.findById( id , (errFind, img) => {

                if (errFind) {
                    reject(errFind)
                    return
                }
    
                if (!img) {
                    reject("id not exist")
                    return
                }
    
                resolve(img)

            })
                
    })
}


module.exports = {
    createSingleFile ,
    createMultipleFiles ,
    getSingleFile
 }
