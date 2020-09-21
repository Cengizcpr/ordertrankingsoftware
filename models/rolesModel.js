const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  roleName: {
    type: String,
    required: true,
  },
  roleDescription: {
    type: String,
    required: true,
  },
  isCheckedUserAdd: {
    type: Boolean
  },
  isCheckedUserList: {
    type: Boolean
  },
  isCheckedUserEdit: {
    type: Boolean
  },
  isCheckedRoleAdd: {
    type: Boolean
  },
  isCheckedRoleEdit: {
    type: Boolean
  },
  isCheckedCompanyAdd: {
    type: Boolean
  },
  isCheckedCompanyList: {
    type: Boolean
  },
  isCheckedCompanyEdit: {
    type: Boolean
  },
  isCheckedProductAdd: {
    type: Boolean
  },
  isCheckedProductList: {
    type: Boolean
  },
  isCheckedProductEdit: {
    type: Boolean
  },
  isCheckedOrderAdd: {
    type: Boolean
  },
  isCheckedOrderEdit: {
    type: Boolean
  },
  isCheckedOrderList: {
    type: Boolean
  },
  isCheckedCheckAll: {
    type: Boolean
  }
});

module.exports = roleSchemas = mongoose.model("role", rolesSchema);
