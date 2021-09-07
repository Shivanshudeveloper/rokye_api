const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51IdwfeH8KzFo5uc9YHKzp2HOPkZJvH0ij0qhWeg0wQ17G73o5fVJYjMkWOfAmWUgjVZe0DesJvrQKbmAPSacXsVP00qMXnEqFr')
const { v4: uuidv4 } = require('uuid');
// Getting Module
const University_Model = require('../models/University');
const Properties_Model = require('../models/Properties');
const AssistantPlan_Model = require('../models/AssistantPlan');
const Plans_Model = require('../models/Plans');
const Payment_Model = require('../models/Payment');
const Refer_Model = require('../models/Refer');
const FeaturedProduct_Model = require('../models/FeaturedProduct');
const Enquery_Model = require('../models/Enquery');
const WishList_Model = require('../models/WishList');
const OtherStore_Model = require('../models/OtherStore');
const ReferForm_Model = require('../models/ReferForm');
const Property_Model = require("../models/Property");
const Enquiry_Model=require("../models/EnquiryDetails");
const Owner_Model=require("../models/OwnerEnquiry");

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// TEST
// @GET TEST
// GET 
router.get('/test', (req, res) => {
    res.send("Working");
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductapi', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainstorefilters/:filter', (req, res) => {
    const { filter } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({ gender: filter })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the Product Details
// GET 
router.get('/getproductitemdetails/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({ _id: id })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsapifilters/:filter', (req, res) => {
    const { filter } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({ Gender: filter })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getcartallitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId, completed: false, payment: false })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/gettrackallitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId, completed: false, payment: true })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductapicategory/:ParentCategory/:Category/:Brand', (req, res) => {
    const { ParentCategory, Category, Brand } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({ ParentCategory, Category, Brand })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/findproducts/:name/:id', (req, res) => {
    const { name, id } = req.params;
    var s = '';
    if (id == "bags") {
        s = "BAGS";
    } else if (id == "accessories") {
        s = "ACCESSORIES";
    } else if (id == "clothing") {
        s = "CLOTHING";
    } else if (id == "shoes") {
        s = "SHOES";
    }
    if (isNumeric(name)) {
        var filterName = Number(name);
        Products2_Model.find({"ListPrice": filterName, "ParentCategory": s}).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    res.status(200).json(data);
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(200).json(data))
    } else {
        var regexName = new RegExp(name);
        res.setHeader('Content-Type', 'application/json');
        var filterName = name.toUpperCase();
        Products2_Model.find({"Title": filterName, "ParentCategory": s}).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    Products2_Model.find({"Brand": filterName, "ParentCategory": s}).sort({date: -1})
                        .then(data => {
                            if (data.length === 0) {
                                Products2_Model.find({"Sku": filterName, "ParentCategory": s}).sort({date: -1})
                                    .then(data => {
                                        if (data.length === 0) {
                                            Products2_Model.find({"MadeIn": filterName, "ParentCategory": s}).sort({date: -1})
                                                .then(data => {
                                                    if (data.length === 0) {
                                                        Products2_Model.find({"Category": filterName, "ParentCategory": s}).sort({date: -1})
                                                            .then(data => {
                                                                if (data.length === 0) {
                                                                    Products2_Model.find({"Gender": filterName, "ParentCategory": s}).sort({date: -1})
                                                                        .then(data => {
                                                                            if (data.length === 0) {
                                                                                res.status(200).json(data);
                                                                            } else {
                                                                                res.status(200).json(data);
                                                                            }
                                                                        })
                                                                        .catch(err => res.status(200).json(data))
                                                                } else {
                                                                    res.status(200).json(data);
                                                                }
                                                            })
                                                            .catch(err => res.status(200).json(data))
                                                    } else {
                                                        res.status(200).json(data);
                                                    }
                                                })
                                                .catch(err => res.status(400).json(`Error: ${err}`))
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    })
                                    .catch(err => res.status(400).json(`Error: ${err}`))
                            } else {
                                res.status(200).json(data);
                            }
                        })
                        .catch(err => res.status(400).json(`Error: ${err}`))
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    }

    

    
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getorderdetails/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.find({ userId, payment: true })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/clearallcartitems/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.deleteMany({ userId })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getcategorymainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Products_Model.find({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getalltheordersmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Payment_Model.find({ completed: false })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});





// Database CRUD Operations
// @POST Request to GET the People
// POST 
router.post('/addproductotherstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { title, price, displayImage, category, madein, gender, description, productfor, product } = req.body;
    OtherStore_Model.countDocuments({ title })
        .then((count) => {
            if (count === 0) {
                const newProductMainStore = new OtherStore_Model({
                    title,
                    price,
                    displayImage,
                    category,
                    madein,
                    gender,
                    description,
                    productfor,
                    product
                });
                newProductMainStore.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            }
        })
});

// Database CRUD Operations
// @POST Request to add featured product to store
// POST 
router.post('/addfeaturedproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { productId, title, price, displayImage } = req.body;
    FeaturedProduct_Model.countDocuments({ title })
        .then((count) => {
            if (count === 0) {
                const newFeaturedProduct = new FeaturedProduct_Model({
                    productId,
                    title,
                    price,
                    displayImage
                });
                newFeaturedProduct.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            }
        })
});


// Database CRUD Operations
// @POST Request to add featured product to store
// POST 
router.post('/addweekproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { productId, title, price, displayImage } = req.body;
    WeekProducts_Model.countDocuments({ title })
        .then((count) => {
            if (count === 0) {
                const newFeaturedProduct = new WeekProducts_Model({
                    productId,
                    title,
                    price,
                    displayImage
                });
                newFeaturedProduct.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            }
        })
});

// Database CRUD Operations
// @POST Request to Add Product to Main Cart
// POST 
router.post('/addproducttocart', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { userId, title, qty, image, price, product } = req.body;
    Cart_Model.countDocuments({ title, userId })
        .then((count) => {
            // if (count === 0) {
                const newProductMainStoreCart = new Cart_Model({
                    userId,
                    title,
                    qty,
                    image,
                    price,
                    product,
                    completed: false,
                    payment: false
                });
                newProductMainStoreCart.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            // }
        })
});

// Database CRUD Operations
// @POST Request to Add Product to Main Cart
// POST 
router.post('/addproducttowish', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { userId, product } = req.body;
    WishList_Model.countDocuments({ userId, productSku: product.product.Sku })
        .then((count) => {
            if (count === 0) {
                const newWish = new WishList_Model({
                    userId,
                    productSku: product.product.Sku,
                    product
                });
                newWish.save()
                    .then((data) => {
                        res.status(200).json("Added")
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(200).json("Added")
            }
        })
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsuserwishlist/:userId', (req, res) => {
    const { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    WishList_Model.find({ userId }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/gethomepagefeaturedproductlist', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.find({}).limit(4).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/gethomepageweekproductlist', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    WeekProducts_Model.find({}).limit(4).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallfeaturedproductmainstoreother/:productfor', (req, res) => {
    const { productfor } = req.params;
    res.setHeader('Content-Type', 'application/json');
    OtherStore_Model.find({ productfor }).limit(4).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallfeaturedproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallweekproductmainstore', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    WeekProducts_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getdesigners', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.find({ category: "BAGS" }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilter/:Color/:Category/:Size/:ParentCategory/:priceFrom/:priceTo/:Brand', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, priceFrom, priceTo, Brand } = req.params;

    if ( Brand == "ALL" ) {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 
    
        // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    } else {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 
    
        // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    }

    
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilterother/:Color/:Category/:Size/:ParentCategory/:priceFrom/:priceTo/:Brand/:productfor', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, priceFrom, priceTo, Brand, productfor } = req.params;

    if ( Brand == "ALL" ) {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 
    
        // OtherStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    } else {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, "product.Brand": Brand, productfor, "product.ParentCategory": ParentCategory, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, "product.Brand": Brand, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, "product.Brand": Brand, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand, "product.Category": Category, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 
    
        // OtherStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    }

    
});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilterprice/:Color/:Category/:Size/:ParentCategory/:sort/:Brand', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, sort, Brand } = req.params;
    var sortList = Number(sort);

    if (Brand == "ALL") {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 

        // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    } else {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.Color": Color, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            MainStore_Model.find({ "product.ParentCategory": ParentCategory, "product.Brand": Brand }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 

        // MainStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    }

});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainfilterpriceother/:Color/:Category/:Size/:ParentCategory/:sort/:Brand/:productfor', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { Color, Category, Size, ParentCategory, sort, Brand, productfor } = req.params;
    var sortList = Number(sort);

    if (Brand == "ALL") {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 

        // OtherStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    } else {
        if ( Color != "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.Brand": Brand, "product.ParentCategory": ParentCategory }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color != "All Colors" && Category != "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.Color": Color, productfor, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category != "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand, "product.Category": Category }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size != "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand, "product.Variants": { $elemMatch: { Size: Size } } }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else if (Color == "All Colors" && Category == "All Categories" && Size == "All Sizes") {
            OtherStore_Model.find({ "product.ParentCategory": ParentCategory, productfor, "product.Brand": Brand }).sort({price: sortList})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } 

        // OtherStore_Model.find({ "product.Color": Color, "product.ParentCategory": ParentCategory, "product.Category": Category, "product.Variants": { $elemMatch: { Size: Size } }, "price": { $gte:priceFrom, $lt:priceTo } }).sort({date: -1})
        //     .then(data => {
        //         res.status(200).json(data);
        //     })
        //     .catch(err => res.status(400).json(`Error: ${err}`))
    }

});



// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/pricefilteradmindashboard/:category/:sort', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { category, sort } = req.params;
    var sortList = Number(sort);
    Products2_Model.find({ ParentCategory: category }).sort({ListPrice: sortList})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmain/:ParentCategory/:Category/:Brand', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { ParentCategory, Category, Brand } = req.params;

    if (Brand == "ALL") {
        if ( Category == "ALL" ) {
            MainStore_Model.find({ gender: 'F', "product.ParentCategory": ParentCategory }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else {
            MainStore_Model.find({ gender: 'F', "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    } else {
        if ( Category == "ALL" ) {
            MainStore_Model.find({ gender: 'F', "product.Brand": Brand, "product.ParentCategory": ParentCategory }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else {
            MainStore_Model.find({ gender: 'F', "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    }
    
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getallproductsmainotherstore/:ParentCategory/:Category/:Brand/:productfor', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { ParentCategory, Category, Brand, productfor } = req.params;
    if (Brand == "ALL") {
        if ( Category == "ALL" ) {
            OtherStore_Model.find({ gender: 'F', "product.ParentCategory": ParentCategory, productfor }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else {
            OtherStore_Model.find({ gender: 'F', productfor, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    } else {
        if ( Category == "ALL" ) {
            OtherStore_Model.find({ gender: 'F', productfor, "product.ParentCategory": ParentCategory }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        } else {
            OtherStore_Model.find({ gender: 'F', productfor, "product.Brand": Brand, "product.ParentCategory": ParentCategory, "product.Category": Category }).sort({date: -1})
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => res.status(400).json(`Error: ${err}`))
        }
    }
    
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagain/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainbrands/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }, { Brand: 1 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});


// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainapplyfilters/:id/:brandname/:subcategory/:gender', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id, brandname, subcategory, gender } = req.params;

    if ( gender == "SHOW ALL" ) {
        if ( subcategory == "SHOW ALL" ) {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        } else {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Category': subcategory })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        }
    } else {
        if ( subcategory == "SHOW ALL" ) {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        } else {
            if (id == "bags") {
                Products2_Model.find({ 'ParentCategory': 'BAGS', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "clothing") {
                Products2_Model.find({ 'ParentCategory': 'CLOTHING', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "accessories") {
                Products2_Model.find({ 'ParentCategory': 'ACCESSORIES', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } else if (id == "shoes") {
                Products2_Model.find({ 'ParentCategory': 'SHOES', 'Brand': brandname, 'Category': subcategory, 'Gender': gender })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(err => res.status(400).json(`Error: ${err}`))
            } 
        }
    }
});

// Database CRUD Operations
// @POST Request to GET the People
// GET 
router.get('/getproductsmainstoreagainskip/:id/:skip', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id, skip } = req.params;
    var numberSkip = Number(skip);
    if (id == "bags") {
        Products2_Model.find({ 'ParentCategory': 'BAGS' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "clothing") {
        Products2_Model.find({ 'ParentCategory': 'CLOTHING' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "accessories") {
        Products2_Model.find({ 'ParentCategory': 'ACCESSORIES' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } else if (id == "shoes") {
        Products2_Model.find({ 'ParentCategory': 'SHOES' }).skip(numberSkip).limit(100)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
    } 
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getitemdetailsmainstore/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteproductmainstore/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    MainStore_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteproductuserwish/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    WishList_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/removefeaturedproduct/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    FeaturedProduct_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/removeweekproduct/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    WeekProducts_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/removefeaturedproductother/:id/:productfor', (req, res) => {
    const { id, productfor } = req.params;
    res.setHeader('Content-Type', 'application/json');
    OtherStore_Model.findOneAndDelete({ '_id': id, productfor })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});




// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/deleteitemsmaincart/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.findOneAndDelete({ '_id': id })
        .then(data => {
            res.status(200).json('Removed')
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @GET Request to DELETE the Compare List Cart Item
// GET 
router.get('/cartitemchangequantitycart/:documentId/:qty', (req, res) => {
    const { documentId, qty } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Cart_Model.findOneAndUpdate({'_id': documentId}, { qty }, { useFindAndModify: false })
        .then(() => {
            res.status(200).json('Users Update');
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to add university
// POST 
router.post('/addnewuniversity', (req, res) => {
    var { name, address, country, city, province, type, category, visa, conditionaloffer, campusaccomodation, workwhilestudy, websiteurl, dicipline, fields, about, logo, coverphoto } = req.body;
    
    country = country.toLowerCase();
    city = city.toLowerCase();
    type = type.toLowerCase();
    category = category.toLowerCase();
    
    res.setHeader('Content-Type', 'application/json');
    University_Model.countDocuments({'name': name})
        .then((count) => {
            if (count === 0) {
                const newUniversity = new University_Model({
                    name,
                    address,
                    country,
                    city,
                    province,
                    type,
                    category,
                    visa,
                    conditionaloffer,
                    campusaccomodation,
                    workwhilestudy,
                    websiteurl,
                    dicipline,
                    logo,
                    coverphoto,
                    programs: fields,
                    about
                });
                newUniversity.save()
                    .then((data) => {
                        res.status(200)
                    })
                    .catch(err => console.log(err))
            }
        })
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversitydatas/:id', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getalluniversity', (req, res) => {
    const { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.post('/updateorderstatusmainstore', (req, res) => {
    const { userId, orderstatus } = req.body;
    Status_Model.updateMany({userId}, { 'status': orderstatus }, { useFindAndModify: false })
        .then(() => {
            if (orderstatus === "Order Completed") {
                Cart_Model.updateMany({userId}, { 'completed': true }, { useFindAndModify: false })
                    .then(() => {
                        Payment_Model.updateMany({userId}, { 'completed': true }, { useFindAndModify: false })
                            .then(() => {
                                res.status(200).json('Cart Updated');
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(200).json('Cart Updated');
            }
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfilterscountry/:country', (req, res) => {
    let { country } = req.params;
    country = country.toLowerCase();
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ 'country': country }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getorderstatusmainstore/:userId', (req, res) => {
    let { userId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Status_Model.find({ userId, status: { $ne: 'Order Completed' } }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfiltersvisa/:visa', (req, res) => {
    let { visa } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ visa }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @GET Request to get the orders of user
// GET 
router.post('/paymentsuccessfull', (req, res) => {
    const { transactionId, email, fullName, phoneno, address, zipcode, userId, amount, note } = req.body;
    res.setHeader('Content-Type', 'application/json');
    Payment_Model.countDocuments({ transactionId })
    .then((count) => {
        if (count === 0) {
            const newSuccessfullPayment = new Payment_Model({
                transactionId,
                email,
                fullName,
                phoneno,
                address,
                zipcode,
                amount,
                note,
                userId,
                completed: false
            });
            newSuccessfullPayment.save()
                .then(() => {
                    Cart_Model.updateMany({userId}, { 'payment': true }, { useFindAndModify: false })
                        .then(() => {
                            const newStatus = new Status_Model({
                                userId,
                                payment: 'Completed',
                                status: 'Order Received'
                            });
                            newStatus.save()
                                .then((data) => {
                                    res.status(200).json('Users Update')
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => res.status(500).json(`Server Error is ${err}`))
        } else {
            res.status(200).json('Added')
        }
    })
    .catch(err => res.status(500).json('Server Error'))
});




// Database CRUD Operations
// @POST Request to the Payment & Charges
// POST 
router.post('/charges', async (req, res) => {
    const {email, amount} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'eur',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
});


// Database CRUD Operations
// @POST Request to the Payment & Charges
// POST 
router.post('/secret', async (req, res) => {
    // const {email, amount} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1929,
        currency: 'eur',
        payment_method_types: ['ideal'],
    });

    res.json({'client_secret': paymentIntent.client_secret})
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfilterscategory/:category', (req, res) => {
    let { category } = req.params;
    category = category.toLowerCase();
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ category }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});




// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getuniversititesfiltersworkwhilestudy/:workwhilestudy', (req, res) => {
    let { workwhilestudy } = req.params;
    res.setHeader('Content-Type', 'application/json');
    University_Model.find({ workwhilestudy }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});














// PROPERTY

// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/postproperty', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { propertyfor,
        propertytype,
        propertystate,
        propertyname,
        bedroom,
        bathroom,
        balconies,
        superarea,
        carpetarea,
        floor,
        furnished,
        rentalprice,
        depositprice,
        description,
        ownertype,
        fullname,
        email,
        phone,
        bhk,
        constructionyear,
        wateravailabe,
        carparkingavailable,
        liftavailabe,
        electricityavailabe,
        features,
        propertyphotos
     } = req.body;
    const newProductMainStore = new Properties_Model({
        propertyfor,
        propertytype,
        propertystate,
        propertyname,
        bedroom,
        bathroom,
        balconies,
        superarea,
        carpetarea,
        floor,
        furnished,
        rentalprice,
        depositprice,
        description,
        ownertype,
        fullname,
        email,
        phone,
        bhk,
        constructionyear,
        wateravailabe,
        carparkingavailable,
        liftavailabe,
        electricityavailabe,
        features,
        status: false,
        propertyphotos
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getallproperty', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Properties_Model.find({ 'status': false }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getallpropertymain/:q/:propertyfor', (req, res) => {
    let { q, propertyfor } = req.params;
    res.setHeader('Content-Type', 'application/json');
    var regexName = new RegExp(q);

    var statename2 = capitalize(q);

    if (propertyfor == "All") {
        Properties_Model.find({ propertyname: regexName, 'status': true }).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    Properties_Model.find({ propertystate: regexName, 'status': true }).sort({date: -1})
                        .then(data => {
                            if (data.length === 0) {
                                Properties_Model.find({ propertystate: statename2, 'status': true }).sort({date: -1})
                                    .then(data => {
                                        if (data.length === 0) {
                                            Properties_Model.find({ 'status': true }).sort({date: -1})
                                                .then(data => {
                                                    if (data.length === 0) {

                                                    } else {
                                                        res.status(200).json(data);
                                                    }
                                                })
                                                .catch(err => res.status(400).json(`Error: ${err}`))
                                        } else {
                                            res.status(200).json(data);
                                        }
                                    })
                                    .catch(err => res.status(400).json(`Error: ${err}`))
                            } else {
                                res.status(200).json(data);
                            }
                        })
                        .catch(err => res.status(200).json(data))
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(200).json(data))
    } else {
        Properties_Model.find({ propertyname: regexName, 'status': true, propertyfor }).sort({date: -1})
            .then(data => {
                if (data.length === 0) {
                    Properties_Model.find({ propertystate: regexName, 'status': true, propertyfor }).sort({date: -1})
                        .then(data => {
                            if (data.length === 0) {
                                Properties_Model.find({ propertystate: statename2, 'status': true, propertyfor }).sort({date: -1})
                                    .then(data => {
                                        if (data.length === 0) {
                                            Properties_Model.find({ 'status': true }).sort({date: -1})
                                                .then(data => {
                                                    if (data.length === 0) {

                                                    }
                                                    else {
                                                        res.status(200).json(data);
                                                    }
                                                })
                                                .catch(err => res.status(400).json(`Error: ${err}`))
                                        }
                                        else {
                                            res.status(200).json(data);
                                        }
                                    })
                                    .catch(err => res.status(400).json(`Error: ${err}`))
                            } else {
                                res.status(200).json(data);
                            }
                        })
                        .catch(err => res.status(200).json(data))
                } else {
                    res.status(200).json(data);
                }
            })
            .catch(err => res.status(200).json(data))
    }
    
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getallpropertymainfilters/:q/:propertyfor/:propertytype/:bhk', (req, res) => {
    let { q, propertyfor, propertytype, bhk } = req.params;
    res.setHeader('Content-Type', 'application/json');
    var regexName = new RegExp(q);

    var statename2 = capitalize(q);

    if (propertytype == "All") {
        if (bhk == "All") {
            if (propertyfor == "All") {
                Properties_Model.find({ propertyname: regexName, 'status': true }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            } else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                } else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            } else {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertyfor }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertyfor }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertyfor }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            }
                                                            else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                }
                                                else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            }
        } else {
            if (propertyfor == "All") {
                Properties_Model.find({ propertyname: regexName, 'status': true, bhk }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, bhk }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, bhk }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true, bhk }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            } else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                } else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            } else {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            }
                                                            else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                }
                                                else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            }
        }
    } else {
        if (bhk == "All") {
            if (propertyfor == "All") {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertytype }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertytype }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertytype }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true, propertytype }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            } else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                } else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            } else {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertyfor, propertytype }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertyfor, propertytype }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertyfor, propertytype }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            }
                                                            else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                }
                                                else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            }
        } else {
            if (propertyfor == "All") {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertytype, bhk }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertytype, bhk }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertytype, bhk }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true, propertytype, bhk }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            } else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                } else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            } else {
                Properties_Model.find({ propertyname: regexName, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                    .then(data => {
                        if (data.length === 0) {
                            Properties_Model.find({ propertystate: regexName, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                                .then(data => {
                                    if (data.length === 0) {
                                        Properties_Model.find({ propertystate: statename2, 'status': true, propertyfor, propertytype, bhk }).sort({date: -1})
                                            .then(data => {
                                                if (data.length === 0) {
                                                    Properties_Model.find({ 'status': true }).sort({date: -1})
                                                        .then(data => {
                                                            if (data.length === 0) {
                                                                res.status(201).json(data);
                                                            }
                                                            else {
                                                                res.status(200).json(data);
                                                            }
                                                        })
                                                        .catch(err => res.status(400).json(`Error: ${err}`))
                                                }
                                                else {
                                                    res.status(200).json(data);
                                                }
                                            })
                                            .catch(err => res.status(400).json(`Error: ${err}`))
                                    } else {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => res.status(200).json(data))
                        } else {
                            res.status(200).json(data);
                        }
                    })
                    .catch(err => res.status(200).json(data))
            }
        }
    }

    


    
    
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getallpropertydetails/:id', (req, res) => {
    let { id } = req.params;
    res.setHeader('Content-Type', 'application/json');
    Properties_Model.findOne({ '_id': id }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to add item in cart
// POST 
router.get('/changepropertystatusdetail/:id/:status', (req, res) => {
    const { id, status } = req.params;
    Properties_Model.findOneAndUpdate({ '_id': id }, { status }, { useFindAndModify: false })
        .then(() => {
            res.status(200).json('Updated Product');
        })
        .catch(err => console.log(err))
});




// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/submitcontactowner', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { fullname,
        email,
        phone,
        propertyid,
        type
    } = req.body;


    const newProductMainStore = new Enquery_Model({
        fullname,
        email,
        phone,
        propertyid,
        type
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getownercontacted', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Enquery_Model.find({ 'type': 'contact owner' }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getpropertyexpert', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Enquery_Model.find({ 'type': 'property expert' }).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/assistantplan', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { fullname,
        email,
        phone,
        propertyname
    } = req.body;


    const newProductMainStore = new AssistantPlan_Model({
        fullname,
        email,
        phone,
        propertyname
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getassistantplan', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    AssistantPlan_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/submitpropertyexpert', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { fullname,
        email,
        phone,
    } = req.body;


    const newProductMainStore = new Enquery_Model({
        fullname,
        email,
        phone,
        type: 'property expert'
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/submitplan', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { fullname,
        email,
        phone,
        enquirefor
    } = req.body;
    console.log(fullname, email, phone, enquirefor);

    const newProductMainStore = new Plans_Model({
        fullname,
        email,
        phone,
        enquirefor
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getplans', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Plans_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/referandearnsubmit', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { ownerfullname,
        ownercity,
        ownerphone,
        yourfullname,
        yourphone
    } = req.body;


    const newProductMainStore = new Refer_Model({
        ownerfullname,
        ownercity,
        ownerphone,
        yourfullname,
        yourphone
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to POST Property
// POST 
router.post('/reviewposted', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { fullname,
        email,
        review
    } = req.body;


    const newProductMainStore = new ReferForm_Model({
        fullname,
        email,
        review
    });
    newProductMainStore.save()
        .then((data) => {
            res.status(200).json("Added")
        })
        .catch(err => console.log(err))
});


// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getrefer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Refer_Model.find({}).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});



// Database CRUD Operations
// @POST Request to GET the University Data
// GET 
router.get('/getallreview', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    ReferForm_Model.find({}).limit(2).sort({date: -1})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});
router.get("/properties/query/:str",async (req,res)=>{
    let q = req.params.str
    console.log(q);
    let results
    try {
        results = await Property_Model.find({"ap-city":{$regex:q,$options:"$i"}})
        if(results.length === 0){
            results = await Property_Model.find({"ap-area":{$regex:q,$options:"$i"}})
            if(results.length === 0){
                results = await Property_Model.find({"ap-title":{$regex:q,$options:"$i"}})
            }
        }
        return res.json({data : results.map(e => e.toObject({getters:true}))})
    } catch (err) {
     return    res.status(400).send(err)
    }
})
router.get("/properties" , async (req,res)=>{
    let properties 
    try{
        properties = await Property_Model.find({})
    }catch(err){
        return res.status(400).send("Could Not Find")
    }
      return res.json({data : properties.map(e => e.toObject({getters:true}))})

})
router.get("/allProperties" , async (req,res)=>{
    let properties 
    try{
        properties = await Properties_Model.find({})
        console.log(properties);
        
    }catch(err){
        return res.status(400).send("Could Not Find")
    }

      return res.json({data : properties.map(e =>e.toObject({getters:true}))})

})
router.post("/enquiryforproperty",async(req,res)=>{
    console.log(req.body)
    let enquiry  = new Owner_Model(req.body)
    try{
        await enquiry.save()
    }catch(err){
        console.log(err);
        return res.status(400).json({err:"Unable to Save"})
    }
    res.status(200).json({message:"Save Successfull"})

})
router.get("/recent" , async (req,res)=>{
    let properties 
    try{
        properties = await Properties_Model.find({})
        console.log(properties);
        
    }catch(err){
        return res.status(400).send("Could Not Find")
    }

      return res.json({data : properties.map(e =>e.toObject({getters:true}))})

})
router.post("/propertyById",async (req,res)=>{
    let property
    try{
        property = await Property_Model.findById(req.body.id)
        if(!property) throw "Can't Find"
        
    }catch(err){
        return res.status(400).send("Could Not Find")
    }
    return res.status(200).json({data : property.toObject({getters:true})}) 
})

router.post("/enquirydetails",async(req,res)=>{
    console.log(req.body)
    let enquiry  = new Enquiry_Model(req.body)
    try{
        await enquiry.save()
    }catch(err){
        console.log(err);
        return res.status(400).json({err:"Unable to Save"})
    }
    res.status(200).json({message:"Save Successfull"})
});
router.get("/ownerenquiries",async(req,res)=>{
    let enquiries
    try{
        enquiries = await Owner_Model.find({})
        console.log(enquiries);
        
    }catch(err){
        return res.status(400).send("Could Not Find")
    }

      return res.json({data : enquiries.map(e =>e.toObject({getters:true}))
    })
});


router.post("/addproperty",async (req,res)=>{
     console.log(req.body)
    let property  = new Property_Model(req.body)
    try{
        await property.save()
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Unable to Save"})
    }
    res.status(200).json({message:"Save Successfull"})
})
module.exports = router;