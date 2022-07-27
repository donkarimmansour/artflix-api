const ContactsControlles = require("../controlles/contact")
const { ApiEndpoints , HandleValidatorError , handleError , passport} = require("../common/routersImports")
const router = require("express").Router()
const {ContactValidator} = require("../middlewares/validators")

// getall
router.get(ApiEndpoints.ContactEndpoints.list , passport.authenticate("admin", {session: false})  ,  ContactsControlles.getAllContacts , handleError )

// count
router.get(ApiEndpoints.ContactEndpoints.count , passport.authenticate("admin", {session: false}) 
,  ContactsControlles.getContactsCount , handleError)
 
// create
router.post(ApiEndpoints.ContactEndpoints.create  , ContactValidator ,  HandleValidatorError , ContactsControlles.createContact )

 
module.exports = router