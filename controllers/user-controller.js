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
    const email = req.body.email;
    const user = await userSchema.create({
        username,email
    });
    // res.send(user);
    res.json({message:"user created",user});
}
// const userCreate = async (req, res) => {
//     try {
//         const { username, email } = req.body;
//         const user = await User.create({ username, email });
//         res.status(201).json({ message: 'User created', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error });
//     }
// };

module.exports = {getUser,userCreate};