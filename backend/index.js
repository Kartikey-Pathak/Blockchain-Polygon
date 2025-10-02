const express = require("express");

require("./config.js");
const product = require("./users.js");

const product2 = require('./users2.js');

const app = express();
const path = require('path');
const cors = require("cors");
const cron = require('node-cron');
const https = require('https');    // using to stay awake the server

const sendOtpEmail = require('./otp.js');
const sendmsg = require('./msg.js');
const logmsg = require("./logmsg.js");
const resetotp = require("./resetotp.js");
const deletemsg = require("./deletemsg.js");

//MiddelWares..
app.use(express.json());


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["*"]
}));

app.get("/", (req, res) => {
    res.send("✅ Backend is running!");
});

//the route made for uptime robot to hit a request here
app.get("/health", (req, res) => {
    res.send("ok");
});




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
        user.otpExpire = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
        console.log("Generated OTP:", otp);

        let result = await user.save();

        resp.status(201).send({ msg: "User created. OTP sent to email." });

        // send OTP email
        sendOtpEmail(req.body.email, otp).catch(err =>
            console.error("Email failed:", err)
        )


        console.log(result);



    } catch (err) {
        console.log(err);
        resp.status(500).send({ error: err.message });

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
app.post("/user/coins/save", async (req, resp) => {

    try {
        const { savecoin, email } = req.body;
        let user = await product.findOne({ email });
        if (!user) {   //not exists
            return resp.status(400).send({ error: "User Not Exists" });
        }
        // only push if not already in array
        if (user.coins.includes(savecoin)) {
            return resp.status(404).send({ error: "Coins is Already Saved" });
        }

        user.coins.push(savecoin);

        await user.save();
        return resp.status(200).send({ msg: "saved" });

    } catch (err) {
        return resp.status(500).send({ erorr: "Server Error Report To User.." });

    }
})

//The Get Method To Display The Saved Coins
app.get("/user/coins/list", async (req, resp) => {
    try {
        const email = req.headers.email;
        const user = await product.findOne({ email });
        if (!user) return resp.status(404).send({ error: "email not found" });

        resp.status(200).json({ coins: user.coins });

    } catch (err) {
        return resp.status(500).send({ error: "Server Error Report Developer" });

    }
})
//The Delete api to remove coins from saved List
app.get("/user/coins/list/del", async (req, resp) => {
    try {
        const coinid = req.headers.coinid;
        const email = req.headers.email;
        const user = await product.findOne({ email });
        if (!user) return resp.status(404).send({ error: "email not found" });

        user.coins.pull(coinid);
        await user.save();

        return resp.status(200).send({ msg: "Removed Successfully" });

    } catch {
        return resp.status(500).send({ error: "Server Error Report Developer" });
    }
})
//The Login Route 
app.post("/user/login", async (req, resp) => {
    try {
        let name = req.body.name;
        let password = req.body.password;
        let user = await product.findOne({ name });
        if (!user) {
            return resp.status(400).send({ error: 'User not found!' });
        }
        // Check password
        if (password !== user.password) {
            return resp.status(401).send({ error: "Invalid password!" });
        }
        let signupEmail = user.email;
        if (password === user.password) {
            // send Login email
             try {
               logmsg(user.email, user.name);
            } catch (err) {
                console.error("Email sending failed:", err);
            }
            return resp.status(200).send({ user, signupEmail });
        }

    } catch (error) {
        return resp.status(500).send({ error: "Server Error Report To Developer" });
    }
})

//The Logout Route
app.post("/user/logout", async (req, resp) => {
    try {
        let name = req.body.user;
        let user = await product.findOne({ name });
        if (!user) {
            return resp.status(400).send({ error: "User Not Found" });
        }
        user.isVerified = false;
        let email = user.email;

        // generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // range 1000–9999
        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
        console.log("Generated OTP:", otp);
        let result = await user.save();

        // send OTP email
        await resetotp(email, otp);

        resp.status(200).send({ msg: "Success" });





    } catch (err) {
        resp.status(500).send({ error: "Server Error" });

    }
})

//the reset otp route 

app.post('/user/otp/reset', async (req, res) => {
    try {
        const { otp, name } = req.body;
        const user = await product.findOne({ name });
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

        res.status(200).send({ msg: 'OTP verified successfully!' });
        //and hence otp verfied succesfully then we will send another mail for registration confirmation to user.


    } catch (err) {
        res.status(500).send({ error: 'Server error!' });
    }
})

//the user change password route

app.post("/user/forget", async (req, resp) => {
    try {
        let { password1, name } = req.body;
        let user = await product.findOne({ name });
        if (!user) {
            resp.status(400).send({ error: "User Didn't Found" });
        }
        user.password = password1;
        let result = await user.save();
        resp.status(200).send({ msg: "Success" });
    } catch (err) {
        resp.status(500).send({ error: "Server Error Report Developer" });
    }
})

//the delete account route
app.delete("/user/delete", async (req, resp) => {
    try {
        let email = req.headers.email;
        let user = await product.findOne({ email });
        if (!user) {
            resp.status(400).send({ error: "User Didn't Found" });
        }
        // send Delete email
         deletemsg(email);
        deletemsg(email);
        await user.deleteOne();

        resp.status(200).send({ msg: "Success" });
    } catch (err) {
        resp.status(500).send({ error: "Server Error Report Developer" });
    }

})

//FeedBack Storage Route
app.post("/feedback", async (req, resp) => {

    try {
        let result = await product2.findOneAndUpdate(
            { email: req.body.email },              // search by email
            { feedback: req.body.feedback },        // update feedback
            { upsert: true, new: true }             // create if not found
        );
        resp.status(200).json({ msg: "Success" });;
    } catch (error) {
        resp.status(500).send({ error: "Server Error Report Developer" });
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

//Logic To Stay the server awake everytime for render 
// cron.schedule('*/14 * * * *', () => {
//     const options = {
//         hostname: 'blockchain-polygon.onrender.com', // backend domain
//         path: '/',
//         method: 'GET'
//     };

//     const req = https.request(options, res => {
//         console.log("Success Re-Render");
//     });

//     req.on('error', error => {
//         console.error("Falied To Re-Render Report User");
//     });

//     req.end();
// });

// serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// fallback: always return index.html for React Router (i.e , to get saved with 404 page error)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
