var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 5000;
var path = require("path");
const User = require("./models/usersModel");

//mongodb
const mongoURI="mongodb://localhost:27017/ordertraking";
mongoose
    .connect(mongoURI,{useNewUrlParser:true})
    .then(()=>console.log("MongoDB Connected."))
    .catch((err)=>console.log(err))

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false,
    })
);
//routers
var userRouter = require("./routes/userRouter");
var rolesRouter = require("./routes/rolesRouter");
var companyRouter = require("./routes/companyRouter");
var productRouter = require("./routes/productRouter");
var orderRouter = require("./routes/orderRouter");
app.use("/users",userRouter);
app.use("/roles",rolesRouter);
app.use("/company",companyRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);


//server started control
app.use(express.static(path.join(__dirname,"public")));
app.listen(port,function(){
    console.log("Server is running on port:"+port);
});