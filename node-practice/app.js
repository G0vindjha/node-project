const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path');
app.use(express.json());
app.use(express.static(path.join("public")));
app.use(urlencoded({extended:true}));

const userRoute = require("./routes/user-route");

app.get("/", (req,res) => {
    res.send("Hello Welcome to home page!!!!");
});

app.use('/user',userRoute);

app.listen(process.env.PORT);