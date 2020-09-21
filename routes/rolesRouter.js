const express = require("express");
const roles = express.Router();
const cors = require("cors");
const Role = require("../models/rolesModel");
roles.use(cors());

process.env.SECRET_KEY = "secret";

roles.post("/roleedit", (req, res) => {
  console.log(req.body.roleName);
  const roleData = {
    roleName: req.body.roleName,
    roleDescription: req.body.roleDescription,
    isCheckedUserAdd:false,
    isCheckedUserList:false ,
    isCheckedUserEdit:false ,
    isCheckedRoleAdd: false,
    isCheckedRoleEdit:false ,
    isCheckedCompanyAdd:false ,
    isCheckedCompanyList:false ,
    isCheckedCompanyEdit: false,
    isCheckedProductAdd:false,
    isCheckedProductList:false ,
    isCheckedProductEdit: false,
    isCheckedOrderAdd: false,
    isCheckedOrderEdit: false,
    isCheckedOrderList:false ,
    isCheckedCheckAll: false
  };

  Role.findOne({
    roleName: req.body.roleName,
  })
    .then((role) => {
      if (!role) {
        Role.create(roleData)
          .then((role) => {
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

roles.get("/rolelist", (req, res) => {
  Role.find({}, function (err, objs) {
    var dbs = objs[0];
    return dbs;
  })
    .then((role) => {
      if (role) {
        res.json(role);
      } else {
        res.json({ error: "Role already exists." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

roles.post("/roledelete", (req, res) => {
  console.log(req.body._id);
  Role.deleteOne({ _id: req.body._id })
    .then((objs) => {
      res.json(objs);
    })
    .catch((err) => {
      res.json({ error: "Roles already exists." });
    });
});
roles.put("/roleupdate", (req, res) => {
  const roleUpdateData = {
    _id: req.body._id,
    isCheckedCheckAll: req.body.isCheckedCheckAll,
    isCheckedUserAdd: req.body.isCheckedUserAdd,
    isCheckedUserAdd: req.body.isCheckedUserAdd,
    isCheckedUserEdit: req.body.isCheckedUserEdit,
    isCheckedUserList: req.body.isCheckedUserList,
    isCheckedCompanyAdd: req.body.isCheckedCompanyAdd,
    isCheckedCompanyEdit: req.body.isCheckedCompanyEdit,
    isCheckedCompanyList: req.body.isCheckedCompanyList,
    isCheckedProductAdd: req.body.isCheckedProductAdd,
    isCheckedProductEdit: req.body.isCheckedProductEdit,
    isCheckedProductList: req.body.isCheckedProductList,
    isCheckedOrderAdd: req.body.isCheckedOrderAdd,
    isCheckedOrderEdit: req.body.isCheckedOrderEdit,
    isCheckedOrderList: req.body.isCheckedOrderList,
    isCheckedRoleAdd: req.body.isCheckedRoleAdd,
    isCheckedRoleEdit: req.body.isCheckedRoleEdit,
    isCheckedSetting: req.body.isCheckedSetting
  };

  Role.update({ _id: req.body._id }, roleUpdateData, function (err, objs) {})
    .then((user) => {
      res.json({ status: "Updated!" });
    })
    .catch((err) => {
      res.json({ message: "true" });
    });
});
module.exports = roles;
