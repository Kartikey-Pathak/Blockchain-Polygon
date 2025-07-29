const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    email:String,
    feedback:String,
});
module.exports=mongoose.model("feedback",productSchema);