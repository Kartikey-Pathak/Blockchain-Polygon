const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
module.exports=mongoose.model("Users",productSchema);