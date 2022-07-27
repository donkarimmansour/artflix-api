const UsersModel = require("../services/users")
const codes = require("../common/codes")


// get All Users
const getAllUsers = (req, res) => {
    const { sort , limit , skip , filter ,  select , expend} = req.query ;

    UsersModel.getAllUsers( sort , limit , skip , filter ,  select , expend).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// ge tUsers Count
const getUsersCount = (req, res) => { 
    const { filter} = req.query ;

    UsersModel.getUsersCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// edit User
const Rule = (req, res) => {
    const { rule } = req.body ;
    const {id} = req.params ;

    UsersModel.Rule(id , rule).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// login
const login = (req, res) => {
    const {email , password} = req.body ;

    UsersModel.login(email , password).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// signup
const signup = (req, res) => {
    const {firstname , lastname ,email , password , phone, address , country , city , postcode , state} = req.body ;

    UsersModel.signup(firstname , lastname ,email , password , phone, address , country , city , postcode , state).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// create
const create = (req, res) => {
    const {firstname , lastname ,email , password , phone, address , country , city , postcode , state} = req.body ;

    UsersModel.create(firstname , lastname ,email , password , phone, address , country , city , postcode , state).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// me
const getMe = (req, res) => {
    const user = req.user ;

    if(user){
        res.status(codes.ok).json({err: false, msg : user})
    }else{
        res.status(codes.badRequest).json({err: true, msg : "empty"})
    }
    
}

// edit User
const editUser = (req, res) => {
    const {firstname , lastname ,email , password , phone, address , country , city , postcode , state} = req.body ;
    const {id} = req.params ;

    UsersModel.editUser(id ,firstname , lastname ,email , password , phone, address , country , city , postcode , state).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// edit Image
const editImage= (req, res) => {
    const {image} = req.body ;
    const {id} = req.params ;

    UsersModel.editImage(id , image).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// address
const address = (req, res) => {
    const {firstname , lastname ,email  , phone, address , country , city , postcode , state} = req.body ;
    const {id} = req.params ;

    UsersModel.address(id ,firstname , lastname ,email  , phone, address , country , city , postcode , state).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// reset Password User
const resetPasswordUser = (req, res) => {
    const {id} = req.params ;
    const { oldpassword , password} = req.body ;

    UsersModel.resetPasswordUser(id , oldpassword , password).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// forgot Password User
const forgotPasswordUser = (req, res) => {
    const {email} = req.body ;

    UsersModel.forgotPasswordUser(email).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// confirm email User
const confirmEmailUser = (req, res) => {
    const {id} = req.params ;

    UsersModel.confirmEmailUser(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// Account Suspension
const Suspension = (req, res) => {
    const {id} = req.params ;
    const { isAccountSuspended } = req.body ;

    UsersModel.Suspension(id , isAccountSuspended).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
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
     forgotPasswordUser ,
     address ,
     editImage ,
     getMe , 
     create ,
     getUsersCount ,
     Rule
}