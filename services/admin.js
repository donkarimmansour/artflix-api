const JWt = require("jsonwebtoken")
const UsersRquest = require("../models/users")


// login
const login = (email, password) => {

    return new Promise((resolve, reject) => { // check details
        UsersRquest.findOne({}, (errFind, admin) => {
            if (errFind){ 
                reject(errFind)
            return }
            
            if (!admin || !admin.comparePassword(password)) {    
               

                reject("email or password is incorrect")
           
            }else {
                if(admin.isAccountSuspended){ 
                    reject("your account is suspended")

                }
               else if(admin.rule !== "admin"){ 
                 reject("you are not admin")


                }else{
                    const TOKEN = JWt.sign({
                        admin , rule : admin.rule 
                    }, process.env.KEY, {expiresIn: "7d"})

                    resolve({TOKEN})
                }
               
            }

        }).where("email").equals(email)//.populate("image")

    })
}




module.exports = {
     login ,
  
}