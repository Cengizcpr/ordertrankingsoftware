const express = require("express");
const orders = express.Router();
const cors = require("cors");
const Order = require("../models/orderModel");
orders.use(cors());

process.env.SECRET_KEY = "secret";
//orderregister
orders.post("/orderregister", (req, res) => {
    const newOrder ={
        companyName:req.body.companyName,
        companyStatusName:req.body.companyStatusName,
        bidderName: req.body.bidderName,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        stockNumber: req.body.stockNumber,
        orderState : req.body.orderState,
        totalName : req.body.totalName
      }
      console.log(newOrder)
  Order.create(newOrder)
    .then((orders) => {
      res.send("true");
    })
    .catch((err) => {
      res.send("false");
    });
});
//stateupdate
orders.put("/orderupdate", (req, res) => {
  const UpdateData = {
    _id: req.body._id,
    companyName:req.body.companyName,
    companyStatusName:req.body.companyStatusName,
    bidderName: req.body.bidderName,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    stockNumber: req.body.stockNumber,
    orderState : req.body.orderState,
    totalName : req.body.totalName

  };

  Order.update({ _id: req.body._id }, UpdateData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});

//orderlist
orders.get("/orderlist", (req, res) => {
  Order.find({},function (err, objs) {
    var dbs = objs[0];
    return dbs;
  })
    .then((order) => {
      if (order) {
        res.json(order);
      } else {
        res.json({ error: "Order already exists." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
//Companydelete
orders.post("/orderdelete", (req, res) => {
  Order.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Order already exists." });
    });
});
orders.post("/orderfind", (req, res) => {
 
  Order.find({ bidderName: req.body.bidderName }, function (err, objs) {
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
module.exports = orders;
