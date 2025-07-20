const express = require("express");
require("./config.js");
const product = require("./users.js");
const app = express();
const cors = require("cors");

const sendOtpEmail = require('./otp.js');

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
            password: req.body.password
        });

        // generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // range 1000–9999
        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
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
            return res.status(400).send({ error: 'Invalid OTP!' });
        }

        // Check OTP expiry
        if (user.otpExpire < Date.now()) {
            return res.status(400).send({ error: 'OTP expired!' });
        }
        // OTP valid
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        res.status(200).send({ msg: 'OTP verified successfully!' });

    } catch (err) {
        res.status(500).send({ error: 'Server error!' });
    }

})

app.listen(5000);
