const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyStatusName: {
    type: String,
    required: true,
  },
  taxCircle: {
    type: String,
    required: true,
  },
  taxNumber: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyPhoneNo: {
    type: String,
    required: true,
  },
  companyAdress: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = companySchemas = mongoose.model("company", companySchema);
