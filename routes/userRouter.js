const express = require("express");
const users = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Role = require("../models/rolesModel");
users.use(cors());

process.env.SECRET_KEY = "secret";
//seed
User.count([], function (err, count) {
  if (count === 0) {
    var data = [
      {
        userName: "admin",
        userFullName: "BMM BİLİŞİM",
        userEmail: "info@bmmbilisim.com",
        userPhoneNo: "03123958933",
        userPassword: "bmm2019",
        roleName : "admin",
        roleDescription : "admin",
        isCheckedCheckAll: true,
        isCheckedUserAdd: true,
        isCheckedUserAdd: true,
        isCheckedUserEdit: true,
        isCheckedUserList: true,
        isCheckedCompanyAdd: true,
        isCheckedCompanyEdit: true,
        isCheckedCompanyList:true,
        isCheckedProductAdd: true,
        isCheckedProductEdit:true,
        isCheckedProductList: true,
        isCheckedOrderAdd: true,
        isCheckedOrderEdit: true,
        isCheckedOrderList:true,
        isCheckedRoleAdd: true,
        isCheckedRoleEdit: true,
      },
    ];

    data.forEach(function (dataUser) {
      bcrypt.hash(dataUser.userPassword, 10, (err, hash) => {
        dataUser.userPassword = hash;
        User.create(dataUser, function (err) {
          if (err) {
          //Hata  console.log(err);
          

          }
          else{
            Role.create(dataUser, function (err) {
            
            })
          }
        });
      });
    });
  }
});
//log
users.post("/login", (req, res) => {
  User.findOne({
    userEmail: req.body.userEmail,
  })
    .then((userDb) => {
      if (userDb) {
        if (bcrypt.compareSync(req.body.userPassword, userDb.userPassword)) {
          const payloadUser = {
            _id: userDb._id,
            userName: userDb.userName,
            userFullName: userDb.userFullName,
            userEmail: userDb.userEmail,
            userPhoneNo: userDb.userPhoneNo,
          };

          let token = jwt.sign(payloadUser, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          console.log("asdasd");
          res.json({ error: "User password or email wrong !" });
        }
      } else {
        console.log("kullanıcı yok");

        res.json({ error: "User does not exist !" });
      }
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});
//register
users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    userName: req.body.userName,
    userFullName: req.body.userFullName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    created: today,
    userPhoneNo: req.body.userPhoneNo,
    roleName:"Yok"
  };

  User.findOne({
    userEmail: req.body.userEmail,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
          userData.userPassword = hash;
          User.create(userData)
            .then((user) => {
              res.send("true");
            })
            .catch((err) => {
              res.send("false");
            });
        });
      } else {
        res.send("err");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
//listuser
users.get("/userlist", (req, res) => {
  User.find({}, function (err, objs) {
    var dbs = objs[0];
    return dbs;
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json({ error: "User already exists." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
//delete
users.post("/userdelete",(req,res)=>{

  User.deleteOne({_id:req.body._id})
  .then((objs)=>{
    res.json(objs);
  })
  .catch((err)=>{
    res.json({error : "User already exists."})
  })
})
//update
users.put("/userupdate", (req, res) => {
  if(req.body.userPassword != '' ){
    const userPasswordData = {
      userPassword: req.body.userPassword,
    };
    bcrypt.hash(req.body.userPassword, 10, (err,hash) => {
      userPasswordData.userPassword = hash;
  
      User.update({ _id: req.body._id }, userPasswordData, function (err, objs) {})
        .then((user) => {
          res.send("true");
        })
        .catch((err) => {
          res.send("false");
        });
    });

  }
  else{
  
  const userUpdateData = {
    userName: req.body.userName,
    userFullName: req.body.userFullName,
    userEmail: req.body.userEmail,
    userPhoneNo: req.body.userPhoneNo,
    _id: req.body._id,
    roleName:req.body.roleName
  
  };

  User.update({ _id: req.body._id }, userUpdateData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
  }
});

module.exports = users;
