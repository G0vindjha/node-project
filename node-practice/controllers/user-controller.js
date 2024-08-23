const userSchema = require("../models/user-model");
const fs = require('fs').promises;
const {encryptPassword,pagination} = require("../middlewares/helperFunction");
const { isEmpty } = require("validator");


const userList = async (req, res) => {
    const {id,email,username} = req.body;
    const filter = {};

    if (id) {
        filter['_id'] = id;
    }
    if (email) {
        filter['email'] = email;
    }
    if (username) {
        filter['username'] = username;
    }

    if(Object.keys(filter).length != 0){
        const userList = await userSchema.find(filter);
        res.send(userList);
    }else{
        const userList = await pagination(userSchema,req);
        res.send(userList);
    }
};

const userCreate = async (req, res) => {
    try {     
        const { username, email, age } = req.body;
        const image = req.file.filename;
        const password = req.body.password;
        // const password = await encryptPassword(req.body.password);
        const userCreate = await userSchema.create({username,email,age,image,password});
        res.send(userCreate);
    } catch (error) {
        // await fs.unlink(process.env.IMG_PATH+"/"+req.file.filename);
        res.send(error);
    }
};

const userUpdate = (req, res) => {
    const { id, name, email, password, age } = req.body;
    res.send("Hello update");
};

const userDelete = (req, res) => {
    res.send("Hello delete");
};

module.exports = {userList,userCreate,userUpdate,userDelete}