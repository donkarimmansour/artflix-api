const fileControlles = require("../controlles/file")
const { singleFile , multipleFiles } = require("../common/uploader")
const {  handleError , idValidator , passport , ApiEndpoints} = require("../common/routersImports")
const router = require("express").Router()

 
// get Single File View
router.get(ApiEndpoints.FileEndpoints.getSingleFileView  , //passport.authenticate("userOradmin", {session: false}) ,
idValidator , fileControlles.getSingleFileView , handleError)
 
// get Single File Download
router.get(ApiEndpoints.FileEndpoints.getSingleFileDownload  , //passport.authenticate("userOradmin", {session: false}) ,
    idValidator , fileControlles.getSingleFileDownload , handleError)
      
// create Single File
router.post(ApiEndpoints.FileEndpoints.createSingleFile , //,  passport.authenticate("userOradmin", {session: false}) ,
singleFile("./public/images" , "image" , ((1024 * 1024) * 2) , { name : "image/png" ,  error : "Please choose a png image only" } , ".png" ) 
, fileControlles.createSingleFile , handleError)
  
// create Multiple Files
router.post(ApiEndpoints.FileEndpoints.createMultipleFile, passport.authenticate("userOradmin", {session: false}) ,
multipleFiles("./public/images" , "images" , ((1024 * 1024) * 2) , { name : "image/jpeg" ,  error : "Please choose a jpeg image only" } , ".jpeg" ) 
, fileControlles.createMultipleFiles , handleError)
 


module.exports = router
