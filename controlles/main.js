const MainsModel = require("../services/main")
const codes = require("../common/codes")



// get All Mains 
const getAllMains = (req, res) => { 
    const { sort , limit , skip , filter ,  select , expend} = req.query ;

    MainsModel.getAllMains( sort , limit , skip , filter ,  select , expend).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get Mains Count
const getMainsCount = (req, res) => { 
    const { filter} = req.query ;

    MainsModel.getMainsCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Main
const createMain = (req, res) => {
    const {name,description, extra , btn , link , image} = req.body ;
    MainsModel.createMain(name,description, extra , btn , link , image).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// edit Main
const editMain = (req, res) => {
    const {name,description, extra , btn , link , image} = req.body ;
    const {id} = req.params ;

    MainsModel.editMain(id,name,description, extra , btn , link , image).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// delete Main
const deleteMain = (req, res) => {
    const {id} = req.params ;

    MainsModel.deleteMain(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// duplicate Main
const duplicateMain = (req, res) => {
    const {id} = req.params ;
    
    MainsModel.duplicateMain(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllMains , deleteMain , editMain , createMain ,
    duplicateMain , getMainsCount
}