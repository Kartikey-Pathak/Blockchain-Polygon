const express = require("express");
require("./config");
const product = require("./users");
const app = express();
const cors = require("cors");

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
        let user = new product(req.body);
        let result = await user.save();

        console.log(result);
        resp.status(201).send({msg:"Saved"});

    } catch(err){
        console.log(err);
        resp.status(500).send({error:"Server Error !"});

    }



});

app.listen(5000);
