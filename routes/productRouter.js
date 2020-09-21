const express = require("express");
const products = express.Router();
const cors = require("cors");
const Product = require("../models/productModel");
products.use(cors());

process.env.SECRET_KEY = "secret";

var productData = {
  productName: "",
  ProductCode: "",
  productDescription: "",
  productPrice: "",
  stockNumber: "",
  productImage: "",
  _id: "",
};
var ımagepath = "";
let multer = require("multer");
let uuidv4 = require("uuid-v4");
const DIR = "./src/uploads";
let c = undefined;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
//ProductRegister
products.post("/productregister", (req, res) => {
  productData = {
    productName: req.body.productName,
    productCode: req.body.productCode,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    stockNumber: req.body.stockNumber,
    productImage: "png-not-found-404.png",
  };

  Product.findOne({
    productName: req.body.productName,
  })
    .then((product) => {
      if (!product) {
        Product.create(productData)
          .then((product) => {
            res.send("true");
          })
          .catch((err) => {
            res.send("false");
          });
      } else {
        res.send("err");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
//ProducImageAdd
products.put("/proimage", upload.single("productImage"), (req, res, next) => {
  var productImageData = {
    productImage: "",
  };
  if (req.file != undefined) {
    productImageData = {
      productImage: req.file.filename,
    };
  } else {
    productImageData = {
      productImage: "png-not-found-404.png",
    };
  }
  Product.update(
    { productName: productData.productName },
    productImageData,
    function (err, objs) {}
  )
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Product already exists" });
    });
});

//list
products.get("/productlist", (req, res) => {
  Product.find({}, function (err, objs) {
    var dbs = objs[0];
    return dbs;
  })
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.json({ error: "Product already exists." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

//productsdel
products.post("/productdelete", (req, res) => {
  Product.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Product already exists." });
    });
});
//porductupdate
products.put("/productupdate", (req, res) => {
  productData = {
    _id: req.body._id,
    productName: req.body.productName,
    productCode: req.body.productCode,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    stockNumber: req.body.stockNumber,
    productImage: req.body.productImage,
  };
  ımagepath = productData._id;
  Product.update({ _id: req.body._id }, productData, function (err, objs) {})
    .then((products) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
//ProducImageupdate
products.put(
  "/proupdateimage",
  upload.single("productImage"),
  (req, res, next) => {
    var productImageData = {
      productImage: "",
    };

    if (req.file != undefined) {
      productImageData = {
        productImage: req.file.filename,
      };
    } else {
      productImageData = {
        productImage: productData.productImage,
      };
    }
    Product.update({ _id: productData._id }, productImageData, function (
      err,
      objs
    ) {})
      .then((objs) => {
        res.json(objs);
      })
      .catch((err) => {
        res.json({ error: "Product already exists" });
      });
  }
);
//stok
products.put("/pstokupdate", (req, res) => {
  const UpdateData = {
    productName: req.body.productName,
    stockNumber:req.body.stockNumber

  };

  Product.update({ productName: req.body.productName }, UpdateData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
//find
products.post("/productfind", (req, res) => {
 
  Product.find({ productName: req.body.productName }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({productName:1}) //Alfabeye göre sıralama
    .then((productNames) => {
      if (productNames) {
        
        res.json(productNames)

      } 
    })
    .catch((err) => {
  res.send("false")
    });
});
module.exports = products;
