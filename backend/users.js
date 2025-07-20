const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    otp:Number,
    otpExpire:Date,
});
module.exports=mongoose.model("Users",productSchema);