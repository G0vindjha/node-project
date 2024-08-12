const userSchema = require("../models/user-model");

const getUser = async (req,res) => {
    const page = req.query.page * 1;
    const limit = req.query.limit * 1;

    const skip = (page - 1) * limit
    
    const user = await userSchema.find()
                                .skip(skip)
                                .limit(limit);
    res.send(user);
};

const userCreate = async (req,res)=>{
    const username = req.body.username;
    const user = await userSchema.create({
        username    
    });
    res.status(200).json({message:"user created",user});
}

module.exports = {getUser,userCreate};