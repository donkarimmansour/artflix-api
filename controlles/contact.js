const ContactsModel = require("../services/contact")
const codes = require("../common/codes")



// get All Contacts 
const getAllContacts = (req, res) => { 
    const { sort , limit , skip , filter} = req.query ;

    ContactsModel.getAllContacts( sort , limit , skip , filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get Contacts Count
const getContactsCount = (req, res) => { 
    const { filter} = req.query ;

    ContactsModel.getContactsCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Contact
const createContact = (req, res) => {
    const {firstname , lastname , email , phone , comment} = req.body ;
    ContactsModel.createContact(firstname , lastname , email , phone , comment).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllContacts , createContact , getContactsCount
}