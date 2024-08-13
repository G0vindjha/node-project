
const userSchema = require("../models/user-model");
const {getError} = require("../middleware/errorThow");

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
    try {
        const username = req.body.username;
        const email = req.body.email;
        const user = await userSchema.create({
            username, email
        });
        res.json({ message: "user created", user });
    } catch (error) {
        getError(error,res);
    }
    
}

module.exports = {getUser,userCreate};