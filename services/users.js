const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
const UsersRquest = require("../models/users")

// getAllUsers
const getAllUsers = (sort = '{"updatedAt" : 1}' , limit = 0 , skip = 0 , filter = '{"firstname" : { "$ne": "xxxlxxx" }}' ,  select = null ,  expend = null) => {

    return new Promise((resolve, reject) => { 
  
            UsersRquest.find({}, (errFind, users) => {
 
                if (errFind) {
                    reject(errFind)
                    return
                }

                if (users.length <= 0) {
                    reject("there are no users")
                    return
                }
    
                resolve(users)
            
    
            })
                .populate(expend)
                .select(select)
                .sort(JSON.parse(sort))
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .setQuery({ ...JSON.parse(filter) })
 
    
    })
}


// ge tUsers Count
const getUsersCount = (filter) => {

    return new Promise((resolve, reject) => {

        UsersRquest.find({}, (errFind, Users) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Users.length <= 0) {
                reject("there are no Users")
                return
            }

            resolve(Users)
 

        }).count({ ...JSON.parse(filter) })

    })
}


// signup
const signup = (firstname , lastname ,email , password , phone, address , country , city , postcode , state) => {

    return new Promise((resolve, reject) => { // check email
        UsersRquest.findOne({}, (errFind, user) => {

            if (errFind) 
                reject(errFind)
               
            if (user) {
                reject("the email already exists")
                return
            }

            // inser a new user
            UsersRquest.create({
                firstname , lastname ,email , password , phone, address , country , city , postcode , state ,
                password: new UsersRquest().hashPassword(password),
                
            }, (errInsert, res) => {
                if (errInsert){ 
                    reject(errInsert)
                return
            }

                
                 //get confim Email Msg
                 const html = messages.confimEmailMsg(res._id)

                // send Email Verification
                 mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL, res.email, "Verify Email", html)
                 .then((succ) => resolve("Confirm your email Please"))
                 .catch(error => reject(error))


            })

        }).where("email").equals(email)
    })
}


// create
const create = (firstname , lastname ,email , password , phone, address , country , city , postcode , state) => {

    return new Promise((resolve, reject) => { // check email
        UsersRquest.findOne({}, (errFind, user) => {

            if (errFind) 
                reject(errFind)
               
            if (user) {
                reject("the email already exists")
                return
            }

            // inser a new user
            UsersRquest.create({
                firstname , lastname ,email , password , phone, address , country , city , postcode , state ,
                password: new UsersRquest().hashPassword(password),
                
            }, (errInsert, res) => {
                if (errInsert){ 
                    reject(errInsert)
                return
            }

                
            resolve(res._id)


            })

        }).where("email").equals(email)
    })
}


// login
const login = (email, password) => {

    return new Promise((resolve, reject) => { // check details
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind){ 
                reject(errFind)
            return }
            
            if (!user || !user.comparePassword(password)) {    
               

                reject("email or password is incorrect")
           
            }else {
                if(user.isAccountSuspended){ 
                    reject("your account is suspended")

                }
               else if(!user.isEmailVerified){ 
                 //get confim Email Msg
                 const html = messages.confimEmailMsg(user._id)

                 // send Email Verification
                  mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL , user.email, "Verify Email", html)
                  .then((succ) => reject("Confirm your email Please"))
                  .catch(error => reject(error))


                }else{
                    const TOKEN = JWt.sign({
                        user , rule : user.rule 
                    }, process.env.KEY, {expiresIn: "7d"})

                    resolve({TOKEN})
                }
               
            }

        }).where("email").equals(email)//.populate("image")

    })
}





// edit User
const editUser = (id ,firstname , lastname ,email , password , phone, address , country , city , postcode , state) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind) 
            
            if (!user) {
                reject("id not exist")
  
            } else {

                //update
                const newpassword = (password == "") ? user.password : user.hashPassword(password)
        
                UsersRquest.updateOne({}, {
                     firstname , lastname ,email , password : newpassword  ,
                     phone, address , country , city , postcode , state ,
                     updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate) 
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("modified")
        
        
                    } else {
                        reject("something went wrong")
        
                    }
        
                }).where("_id").equals(id)
               
            }

        }).where("_id").equals(id)



    })
}


// edit Image
const editImage = (id , image ) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOneAndUpdate({} , { image , updatedAt: Date.now() } ,{new : true}, (errFind, user) => {
            if (errFind) 
                reject(errFind) 
            
            if (!user) {
                reject("id not exist")
  
            } else {

                //update
        
                resolve(user.image)

               
            }

        }).where("_id").equals(id)



    })
}


// address
const address = (id ,firstname , lastname ,email , phone, address , country , city , postcode , state) => {

    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

                UsersRquest.updateOne({}, { shippingaddress : {
                   firstname , lastname ,email , phone, address , 
                   country , city , postcode , state ,
                } , 
                    updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate)
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("modified")
        
        
                    } else {
                        reject("something went wrong")
        
                    }
        
                }).where("_id").equals(id)
               
            }

        }).where("_id").equals(id)



    })
}



// reset Password User
const resetPasswordUser = (id , oldpassword , password) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

                if(!user.comparePassword(oldpassword)){
                    reject("old password is incorrect")

                }else{

                    UsersRquest.updateOne({}, {
                        password: new UsersRquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {

                           resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
                }

               
            }

        }).where("_id").equals(id)



    })
}


// forgot Password User
const forgotPasswordUser = (email) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("email not exist")

            } else {

                //update
                   const password = (Math.random() + 1).toString(36).substring(4);;

                    UsersRquest.updateOne({}, {
                        password: new UsersRquest().hashPassword(password),
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {

                           //get confim Email Msg
                           const html = messages.resetPasswordMsg(password)

                           // send Email Verification
                           mailer.sendMAIL(process.env.SMTP_SENDER_NAME , process.env.SMTP_SENDER_EMAIL, email, "new Password", html)
                           .then((succ) => resolve("new Sent password"))
                           .catch(error => reject(error))
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("email").equals(email)
                }


        }).where("email").equals(email)



    })
}



// confirm email User
const confirmEmailUser = (id) => {
   console.log(id);
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    UsersRquest.updateOne({}, {
                        isEmailVerified : true,
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {
                            resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
                }

               

        }).where("_id").equals(id)

    })
}



// Account Suspension
const Suspension = (id , isAccountSuspended) => {
    return new Promise((resolve, reject) => { // update user
       // check id
        UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind)
            
            if (!user) {
                reject("id not exist")

            } else {

                //update

        
                    UsersRquest.updateOne({}, {
                        isAccountSuspended,
                        updatedAt: Date.now()
                    }, (errUpdate, doc) => {
                        if (errUpdate) 
                            reject(errUpdate)
                        
                        if (doc.modifiedCount > 0) {
                            resolve("modified")
            
                        } else {
                            reject("something went wrong")
            
                        }
            
                    }).where("_id").equals(id)
                }

               

        }).where("_id").equals(id)

    })
}


// edit User
const Rule = (id , rule) => {
    return new Promise((resolve, reject) => { // update user
       // check id
       UsersRquest.findOne({}, (errFind, user) => {
            if (errFind) 
                reject(errFind) 
            
            if (!user) {
                reject("id not exist")
  
            } else {

                //update        
                UsersRquest.updateOne({}, {
                     rule ,
                     updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate){ 
                        reject(errUpdate)
                        return
                    }
                    
                    if (doc.modifiedCount > 0) {
                        resolve("modified")
        
        
                    } else {
                        reject("something went wrong")
        
                    }
        
                }).where("_id").equals(id)
               
            }

        }).where("_id").equals(id)



    })
}

module.exports = {
    getAllUsers,
     login ,
     signup ,
     resetPasswordUser ,
     confirmEmailUser ,
     editUser , 
     Suspension , 
     forgotPasswordUser  ,
     address ,
     editImage ,
     create ,
     getUsersCount ,
     Rule
    }