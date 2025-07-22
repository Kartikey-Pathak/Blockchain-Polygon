const express = require("express");
require("./config.js");
const product = require("./users.js");
const app = express();
const cors = require("cors");
const cron = require('node-cron');

const sendOtpEmail = require('./otp.js');
const sendmsg = require('./msg.js');

//MiddelWares..
app.use(express.json());
app.use(cors());

app.post("/user/signup", async (req, resp) => {
    try {
        let exist = await product.findOne({ name: req.body.name });
        if (exist) {   //already exists
            return resp.status(400).send({ error: "User Exists !" });
        }
        // otherwise
        let user = new product({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isVerified: false,
        });

        // generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // range 1000–9999
        user.otp = otp;
        user.otpExpire = Date.now() + 5* 60 * 1000; // valid for 5 minutes
        console.log("Generated OTP:", otp);

        let result = await user.save();
        // send OTP email
        await sendOtpEmail(req.body.email, otp);



        console.log(result);

        resp.status(201).send(user);



    } catch (err) {
        console.log(err);
        resp.status(500).send({ error: "Server Error !" });

    }



});



app.post('/user/otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await product.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'User not found!' });
        }

        // Check OTP match
        if (user.otp !== Number(otp)) {
            return res.status(400).send({ error: 'Invalid OTP Or Expired !' });
        }

        // Check OTP expiry
        if (user.otpExpire < Date.now()) {
            await product.deleteOne({ email }); //deletes unverified
            return res.status(400).send({ error: 'OTP expired!' });
        }
        // OTP valid
        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        // send OTP Message
        await sendmsg(req.body.email);


        res.status(200).send({ msg: 'OTP verified successfully!' });
        //and hence otp verfied succesfully then we will send another mail for registration confirmation to user.


    } catch (err) {
        res.status(500).send({ error: 'Server error!' });
    }

})


//post method to save the coins send by data.js
app.post("/user/coins/save",async (req,resp)=>{
    
    try{
        const {savecoin,email}=req.body;
        let user=await product.findOne({email});
        if (!user) {   //not exists
            return resp.status(400).send({error:"User Not Exists"});
        }
        // only push if not already in array
        if(user.coins.includes(savecoin)){
            return resp.status(404).send({error:"Coins is Already Saved"});
        }

         user.coins.push(savecoin);

        await user.save();
        return resp.status(200).send({msg:"saved"});

    }catch (err){
        return resp.status(500).send({erorr:"Server Error Report To User.."});

    }


})



cron.schedule('*/5 * * * *', async () => {
    try {
        const now = Date.now();
        const result = await product.deleteMany({
            isVerified: false,
            otpExpire: { $lt: now }   // delete only expired unverified users
        });
        if (result.deletedCount > 0) {
            console.log(`Cleaned up ${result.deletedCount} expired users`);
        }
    } catch (err) {
        console.error('Error cleaning expired users:', err);
    }
});

app.listen(5000);
