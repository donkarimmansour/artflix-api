const CatigoriesModel = require("../services/catigories")
const codes = require("../common/codes")



// get All Catigories 
const getAllCatigories = (req, res) => { 
    const { sort , limit , skip , filter ,  select , expend} = req.query ;

    CatigoriesModel.getAllCatigories( sort , limit , skip , filter ,  select , expend).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// get All Catigories tab
const getAllCatigoriesTab = (req, res) => {
    const { sort , limit , skip , filter ,  select} = req.query ;

    CatigoriesModel.getAllCatigoriesTab( sort , limit , skip , filter ,  select).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get Caty Count
const getCatyCount = (req, res) => { 
    const { filter} = req.query ;

    CatigoriesModel.getCatyCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// create Catigorie
const createCatigorie = (req, res) => {
    const { name , fullDescription , shortDescription  , parentcategory} = req.body ;
    CatigoriesModel.createCatigorie( name , fullDescription , shortDescription  , parentcategory).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// edit Catigorie
const editCatigorie = (req, res) => {
    const { name , fullDescription , shortDescription  , parentcategory} = req.body ;
    const {id} = req.params ;

    CatigoriesModel.editCatigorie(id, name , fullDescription , shortDescription  , parentcategory).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// delete Catigorie
const deleteCatigorie = (req, res) => {
    const {id} = req.params ;

    CatigoriesModel.deleteCatigorie(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// duplicate Catigorie
const duplicateCatigorie = (req, res) => {
    const {id} = req.params ;

    CatigoriesModel.duplicateCatigorie(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllCatigories , deleteCatigorie , editCatigorie , createCatigorie ,
    duplicateCatigorie , getAllCatigoriesTab , getCatyCount
}