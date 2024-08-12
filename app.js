const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
require('dotenv').config();
const userRouter = require('./Routes/user-router');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello');
});

app.use("/user",userRouter);

app.listen(process.env.PORT)