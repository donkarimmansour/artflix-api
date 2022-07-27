const ContactsRquest = require("../models/contact")



// getAllContacts
const getAllContacts = (sort = '{"createdAt" : 1}', limit = 0 , skip = 0 , filter = '{"name" : { "$ne": "xxxlxxx" }}') => {
    return new Promise((resolve, reject) => {

        ContactsRquest.find({}, (errFind, Contacts) => {

            if (errFind) {console.log(errFind);
                reject(errFind)
                return
            }

            if (Contacts.length <= 0) {
                reject("there are no Contacts")
                return
            }

            resolve(Contacts)


        })
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })


    })
}





// get Contacts Count
const getContactsCount = (filter) => {

    return new Promise((resolve, reject) => {

        ContactsRquest.find({}, (errFind, Contacts) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Contacts.length <= 0) {
                reject("there are no Contacts")
                return
            }

            resolve(Contacts)
 

        }).count({ ...JSON.parse(filter) })

    })
}




// create Contact
const createContact = (firstname , lastname , email , phone , comment) => {
    return new Promise((resolve, reject) => {
        //create
        ContactsRquest.create({
            firstname , lastname , email , phone , comment
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
    getAllContacts, createContact , getContactsCount
}
