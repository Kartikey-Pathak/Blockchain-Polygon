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
            return resp.send({ error: "exists !" });
        }
        // otherwise
        let user = new product(req.body);
        let result = await user.save();

        console.log(result);
        resp.send(req.body);

    } catch(err){
        console.log(err);
        resp.send({error:"Server Error !"});

    }



});

app.listen(5000);
