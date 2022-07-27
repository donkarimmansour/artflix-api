const multer = require("multer")
const path = require("path")

// put single File
const singleFile = (dest , name , size , type , extended ) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, dest),
            filename: (req, file, cb) => cb(null, file.originalname.substr(0 , file.originalname.lastIndexOf(".")) + "__" + Date.now() + path.extname(file.originalname)) ,
        }),
        // fileFilter: (req, file, cb) => {
        //     if (file.mimetype !== type.name) cb(new Error(type.error), false)
        //     else cb(null, true)
        // },
     //   limits: { fileSize: size }
    }).single(name) 
}

// put multiole Files
const multipleFiles = (dest , name , size , type , extended ) => {

    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => cb(null, dest),
            filename: (req, file, cb) => cb(null, file.originalname.substr(0 , file.originalname.lastIndexOf(".")) + "__" + Date.now() + + path.extname(file.originalname)) ,
        }),
        // fileFilter: (req, file, cb) => {
        //     console.log(file.mimetype);
        //     if (file.mimetype !== type.name) cb(new Error(type.error), false)
        //     else cb(null, true)
        // },
      //  limits: { fileSize: size }
    }).array(name , 10)
}

module.exports = {
    singleFile ,
    multipleFiles
}


