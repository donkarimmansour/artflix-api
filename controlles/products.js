const ProductsModel = require("../services/products")
const codes = require("../common/codes")



// get All Products 
const getAllProducts = (req, res) => { 
    const { sort , limit , skip , filter ,  select} = req.query ;
    
    ProductsModel.getAllProducts( sort , limit , skip , filter ,  select).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// get Products Count
const getProductsCount = (req, res) => { 
    const { filter} = req.query ;

    ProductsModel.getProductsCount( filter).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get All Products tab
const getAllProductsTab = (req, res) => {
    const { sort , limit , skip , filter ,  select} = req.query ;

    ProductsModel.getAllProductsTab( sort , limit , skip , filter ,  select).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// get All Distinct
const getAllDistinct = (req, res) => {
    const {distinct , caty} = req.body ;

    ProductsModel.getAllDistinct(distinct , caty).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}



// create Product
const createProduct = (req, res) => {
    const {name,description,stock,oldprice,price,condition,status,limitedAtt,color,size,review,images,viewcount,soldcount , category,info , shipping} = req.body ;

    ProductsModel.createProduct(name,description,stock,oldprice,price,condition,status,limitedAtt,color,size,review,images,viewcount,soldcount, category,info , shipping).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// edit Product
const editProduct = (req, res) => {
    const {name,description,stock,oldprice,price,condition,status,limitedAtt,color,size,review,images,viewcount,soldcount,info , shipping ,  category} = req.body ;
    const {id} = req.params ;

    ProductsModel.editProduct(id ,name,description,stock,oldprice,price,condition,status,limitedAtt,color,size,review,images,viewcount,soldcount,info , shipping ,  category).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// review Product
const reviewProduct = (req, res) => {
    const { iduser, feedback , rate} = req.body ;
    const {id} = req.params ;

    ProductsModel.reviewProduct(id , iduser, feedback , rate).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// delete Product
const deleteProduct = (req, res) => {
    const {id} = req.params ;

    ProductsModel.deleteProduct(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

// duplicate Product
const duplicateProduct = (req, res) => {
    const {id} = req.params ;

    ProductsModel.duplicateProduct(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// update Views
const updateViews = (req, res) => {
    const {type} = req.body ;
    const {id} = req.params ;

    ProductsModel.updateViews(id , type).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}


// aliexpress clone
const aliexpress = (req, res) => {
    const {id} = req.params ;

    ProductsModel.aliexpress(id).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
}

module.exports = {
   getAllProducts , deleteProduct , editProduct , createProduct ,
    duplicateProduct , reviewProduct , getAllProductsTab , getAllDistinct ,
    getProductsCount , updateViews , aliexpress
}