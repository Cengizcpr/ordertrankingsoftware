const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    userName : {
        type : String,
        required : true
    },
    userFullName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true
    },
    userPhoneNo : {
        type : String,
        required : true
    },
    userPassword : {
        type : String,
        required : true
    },
    roleName : {
        type : String
    }, 
    date : {
        type : Date,
        default : Date.now
    }

})

module.exports = userSchemas = mongoose.model('user',userSchema);