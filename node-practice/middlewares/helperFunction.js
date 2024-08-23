const multer = require("multer")
const bcrypt = require('bcrypt');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMG_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
});

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALTROUND));
        const hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw Error("Something Went Wrong");
    }
};
// const encryptPassword = async (password) => {
//     try {
//         const saltRounds = parseInt(process.env.SALTROUND, 10);
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
//         return hash;
//     } catch (err) {
//         console.error(err);
//         throw new Error('Password encryption failed');
//     }
// };

const pagination = async (model,req) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const isPagination = !isNaN(page) && page > 0 && !isNaN(limit) && limit > 0;

    if(isPagination) {
        const skip = (page - 1) * limit;
        return await model.find().limit(limit).skip(skip);
    }else{
        return await model.find();
    }
};

module.exports = {storage,encryptPassword,pagination}