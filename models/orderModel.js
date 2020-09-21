const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
 
  companyName: {
    type: String,
    required: true,
  },
  companyStatusName: {
    type: String,
    required: true,
  },
  bidderName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    
  },
  productPrice: {
    type: Number,
    required: true,
  },
  stockNumber: {
    type: Number,
    required: true,
  },
  totalName: {
    type: Number,
  },
  orderState: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = orderSchemas = mongoose.model("orders", orderSchema);
