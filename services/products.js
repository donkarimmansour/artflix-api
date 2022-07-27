const ProductsRquest = require("../models/products")
const FilesServ = require("../services/file")
const http = require('http');
const fs = require('fs');
const path = require("path")
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const request = require('request');
const ntc = require('colornames');


// getAllProducts
const getAllProducts = (sort = '{"updatedAt" : 1}', limit = 0, skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null) => {

    return new Promise((resolve, reject) => {

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Products.length <= 0) {
                reject("there are no Products")
                return
            }

            resolve(Products)


        })
            .populate("images")
            .select(select)
            .sort(JSON.parse(sort))
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .setQuery({ ...JSON.parse(filter) })



    })
}





// getAllProducts tab area
const getAllProductsTab = (sort = '{"updatedAt" : 1}', limit = 10000000, skip = 0, filter = '{"name" : { "$ne": "xxxlxxx" }}', select = null) => {

    return new Promise((resolve, reject) => {


        ProductsRquest.aggregate([
            { $match: { ...JSON.parse(filter) } },
            { $lookup: { from: `files`, localField: `images`, foreignField: "_id", as: `images` } },
            { $unwind: "$images" },
            { $group: { "_id": `$$ROOT.category`, "products": { "$push": { "product": "$$ROOT" } } } },
            { $project: { products: { $slice: ["$products", parseInt(limit)] } } },
            { $skip: parseInt(skip) },
            { $sort: JSON.parse(sort) },

        ]).exec((errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Products.length <= 0) {
                reject("there are no Products")
                return
            }

            resolve(Products)


        })



    })
}



// getAll Distinct
const getAllDistinct = (distinct, caty) => {
    const filter = caty ? { category: caty } : {}


    return new Promise((resolve, reject) => {

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            // if (Products.length <= 0) {
            //     reject("there are no Categories")
            //     return
            // }

            resolve(Products)


        }).distinct(distinct, filter)


    })
}



// create Product
const createProduct = (name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, category, info, shipping) => {
    return new Promise((resolve, reject) => {

        //create
        ProductsRquest.create({
            name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, category, info, shipping
        }, (errCreate, doc) => {
            if (errCreate) {
                reject(errCreate)
                return
            }

            resolve(doc._id)
        })

    })
}


// get Products Count
const getProductsCount = (filter) => {

    return new Promise((resolve, reject) => {

        ProductsRquest.find({}, (errFind, Products) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Products.length <= 0) {
                reject("there are no Products")
                return
            }

            resolve(Products)


        }).count({ ...JSON.parse(filter) })

    })
}


// update Product
const editProduct = (id, name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, info, shipping ,  category) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                //update

                ProductsRquest.updateOne({}, {
                    name, description, stock, oldprice, price, condition, status, limitedAtt, color, size, review, images, viewcount, soldcount, info, shipping ,  category
                    , updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}

// review Product
const reviewProduct = (id, iduser, feedback, rate) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                //update

                let reviews = prdct.reviews;
                const index = prdct.reviews.findIndex(review => review.id == iduser);

                if (index > -1) {
                    reviews[index].id = iduser
                    reviews[index].feedback = feedback
                    reviews[index].rate = rate
                } else {
                    reviews.push({ id: iduser, feedback, rate })
                }


                ProductsRquest.updateOne({}, {
                    reviews, updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}

// delete Product
const deleteProduct = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {
                //delete
                ProductsRquest.deleteOne({}
                    , (errUpdate, doc) => {
                        if (errUpdate) {
                            reject(errUpdate)
                            return
                        }

                        if (doc.deletedCount > 0) {
                            resolve("deleted")

                        } else {
                            reject("something went wrong")
                        }

                    }).where("_id").equals(id)
            }//else
        }).where("_id").equals(id)

    })
}




// duplicate Product
const duplicateProduct = (id) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {

                if (delete prdct._doc._id) {


                    ProductsRquest.create({ ...prdct._doc, updatedAt: Date.now(), createdAt: Date.now() }, (errCreate, doc) => {
                        if (errCreate) {
                            reject(errCreate)
                            return
                        }

                        resolve(doc._id)
                    })

                } else {
                    reject("something went wrong")

                }


            }//else
        }).where("_id").equals(id)

    })
}


// update Views
const updateViews = (id, type) => {

    return new Promise((resolve, reject) => {

        // check id
        ProductsRquest.findOne({}, (errFind, prdct) => {
            if (errFind)
                reject(errFind)

            if (!prdct) {
                reject("id not exist")

            } else {


                //update
                ProductsRquest.updateOne({}, {
                    viewcount: type == "view" ? prdct._doc.viewcount + 1 : prdct._doc.viewcount,
                    soldcount: type == "sold" ? prdct._doc.soldcount + 1 : prdct._doc.soldcount,
                    updatedAt: Date.now()
                }, (errUpdate, doc) => {
                    if (errUpdate) {
                        reject(errUpdate)
                        return
                    }

                    if (doc.modifiedCount > 0) {
                        resolve("modified")

                    } else {
                        reject("something went wrong")
                    }

                }).where("_id").equals(id)

            }//else
        }).where("_id").equals(id)

    })
}


// aliexpress clone
const aliexpress = (id) => {

    return new Promise((resolve, reject) => {

        try {

            
            decimalNumber = number => Number.isInteger(number) ? number : parseFloat(number.toFixed(2)) 


            const wait = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));

            async function clone() {

                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                /** Scrape the aliexpress product page for details */
                await page.goto(`https://www.aliexpress.com/item/${id}.html`, { waitUntil: 'load', timeout: 0 });
            //    page.setDefaultTimeout(0)

                const aliExpressData = await page.evaluate(() => runParams);
                const data = aliExpressData.data;

                if (!("descriptionModule" in data)) {
                    reject("error with product id")
                    return
                }

                /** Scrape the description page for the product using the description url */
                const descriptionUrl = data.descriptionModule.descriptionUrl;
                await page.goto(descriptionUrl);  
                const descriptionPageHtml = await page.content(); 

                /** Build the AST for the description page html content using cheerio */
                const $ = cheerio.load(descriptionPageHtml);
                const descriptionData = $('body').text();
                await browser.close();


                const optionsLists = data.skuModule.productSKUPropertyList || [];

                 const Variants = optionsLists.map(list => {
                    if(list.skuPropertyName === "Color"){
                        return {
                            colors: list.skuPropertyValues.map(val => {

                                const initColor = ntc.get(val.propertyValueName)
                                const mycolor = val.skuColorValue ? val.skuColorValue : initColor && initColor.value ? initColor.value : "";
                            
                                if (mycolor !== "") {
                                    return {
                                        name: val.propertyValueName,
                                        color : mycolor
                                    };
                                }
                              
                            })
                        };
                    }else if(list.skuPropertyName === "Size"){
                        return {
                            sizes : list.skuPropertyValues.map(val => {
                                return {
                                    name: val.propertyValueName,
                                    color: val.skuColorValue,
                                };
                            })
                        };
                    }
                   
                 });

                const { title, images, price, oldprice, description, shipping, specs, variants: [colors, sizes] } = {
                    title: data.titleModule.subject,
                    variants: Variants,
                    specs: data.specsModule.props,
                    oldprice: data.priceModule.minAmount.value,
                    price: ("minActivityAmount" in data.priceModule) ? data.priceModule.minActivityAmount.value : data.priceModule.minAmount.value, 
                    description: descriptionData, 
                    shipping: data.shippingModule.generalFreightInfo.originalLayoutResultList.map(shipp => shipp.bizData ),
                    images: (data.imageModule && data.imageModule.imagePathList) || []
                }

                 const color = colors?.colors?.filter(c => c !== null && c).map(c => c.color )
                 const size = sizes?.sizes?.map(s => { return { size: s.name, price:  decimalNumber(price)  } })

 
                //  const sp = specs?.map(sp => { return { name: sp.attrName, value: sp.attrValue } })
                const sp = specs?.reduce(function (obj, v) {
                    obj[v.attrName] = v.attrValue;
                    return obj;
                }, {})


                const shippings = shipping.map(s => {
                   const minPrice = s.deliveryDayMin === s.deliveryDayMax ? (s.deliveryDayMax - 1) : s.deliveryDayMax

                    return { name: s.company.replace(/AliExpress|Aliexpress/g , "Our") , from: minPrice , to: s.deliveryDayMax , price: ("displayAmount" in s) ? decimalNumber(s.displayAmount  * 1.2) : 0 }
                }) 


                const imgs = []

                /////////////////////////////////////////////////////////////////

                const imgReqs = images.map((img, index) => {

                    const imgName = img.substring(img.lastIndexOf("/"), img.lastIndexOf(".")) + "__" + Date.now() + (Math.random() * 1) + path.extname(img)
                    const dest = "./public/images/" + imgName

                    return new Promise((Cresolve, Creject) => {

                        return request(img)
                            .on('response', function (response) {
 
                                if (response && response.statusCode === 200) { 

                                    console.log("request => ", index);

                                    FilesServ.createSingleImage(imgName)
                                        .then(result => {

                                            wait(1000);

                                            console.log("--------------------------------------");
                                            console.log("createSingleImage => ", index);
                                            console.log("--------------------------------------");
                                            Cresolve(result)

                                        }).catch(err => reject(err))

                                } else {

                                    console.log("there was an error with your photo");
                                    fs.unlink(dest, () => { }); // Delete temp file
                                    Creject("there was an error with your photo");
                                }



                            })
                            .on("error", err => {
                                //  file.close();
                                console.log(err.message);
                                fs.unlink(dest, () => { }); // Delete temp file
                                Creject(err)(err.message);
                            }).pipe(fs.createWriteStream(dest));

                    }).then(mRss => imgs.push(mRss))
                    .catch(mErr => { reject(mErr) })

                })

                await Promise.all(imgReqs).then((values) => {

                    createProduct(title, description, 9, decimalNumber(oldprice * 2.2), decimalNumber(price * 2.2) , "new", "published", "2021-10-10", color, size, [], imgs, 10, 10, "...", sp, shippings)
                        .then(result => {

                            resolve(result._id)

                        }).catch(err => reject(err)) 


                }).catch(err => { console.log(err); });


                //////////////////////////////////////////////////////////////////


            }

            clone();

        } catch (err) {
            console.log(err);
            reject(err)
        }

    })

}
 
module.exports = {
    getAllProducts, deleteProduct, editProduct, createProduct,
    duplicateProduct, reviewProduct, getAllProductsTab 
    , getAllDistinct, getProductsCount, updateViews, aliexpress
}
