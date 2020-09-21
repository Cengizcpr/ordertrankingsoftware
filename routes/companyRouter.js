const express = require("express");
const companys = express.Router();
const cors = require("cors");
const Company = require("../models/companyModel");
companys.use(cors());

process.env.SECRET_KEY = "secret";
//Companyregister
companys.post("/companyregister", (req, res) => {
  const companyData = {
    companyName: req.body.companyName,
    companyStatusName: req.body.companyStatusName,
    taxCircle: req.body.taxCircle,
    taxNumber: req.body.taxNumber,
    companyEmail: req.body.companyEmail,
    companyPhoneNo: req.body.companyPhoneNo,
    companyAdress: req.body.companyAdress,

    
  };

  Company.findOne({
    companyName: req.body.companyName,
  })
    .then((company) => {
      if (!company) {
        Company.create(companyData)
          .then((company) => {
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
//Companylist
companys.get("/companylist", (req, res) => {
  Company.find({}, function (err, objs) {
    var dbs = objs[0];
    return dbs;
  })
    .then((role) => {
      if (role) {
        res.json(role);
      } else {
        res.json({ error: "Company already exists." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
//Companydelete
companys.post("/companydelete", (req, res) => {
  Company.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Roles already exists." });
    });
});
//update
companys.put("/companyupdate", (req, res) => {
  const roleUpdateData = {
    _id: req.body._id,
    companyName: req.body.companyName,
    companyStatusName: req.body.companyStatusName,
    taxCircle: req.body.taxCircle,
    taxNumber: req.body.taxNumber,
    companyEmail: req.body.companyEmail,
    companyPhoneNo: req.body.companyPhoneNo,
    companyAdress: req.body.companyAdress,

  };

  Company.update({ _id: req.body._id }, roleUpdateData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
//find
companys.post("/companyfind", (req, res) => {
 
  Company.find({ companyName: req.body.companyName }, function (err, objs) {
    var dbs = objs[0];

    return dbs;
  })
    .sort({companyName:1}) //Alfabeye göre sıralama
    .then((companyNames) => {
      if (companyNames) {
        
        res.json(companyNames)

      } 
    })
    .catch((err) => {
  res.send("false")
    });
});
module.exports = companys;
