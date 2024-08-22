const userSchema = require("../models/user-model");
const fs = require('fs').promises;
const {encryptPassword} = require("../middlewares/helperFunction");
const { isEmpty } = require("validator");


const userList = async (req, res) => {
    const {id,email,username} = req.body;
    const { page = 1, limit = 10 } = req.params; // Default values for pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    if(!isEmpty(pageNum) && !isEmpty(limitNum)){
        const page = req.params.page * 1;
        const limit = req.params.limit * 1;
        const skip = (page - 1) * limit;
        const userList = await userSchema.find().limit(limit).skip(skip);
    }else{
        const userList = await userSchema.find();
    }
        const userList = await userSchema.find();
    res.send(userList);
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