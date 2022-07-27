const AdminsModel = require("../services/admin")
const codes = require("../common/codes")



// login
const login = (req, res) => {
    const {email , password} = req.body ;

    AdminsModel.login(email , password).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


module.exports = {
     login ,

}