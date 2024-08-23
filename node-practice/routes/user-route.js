const express = require('express');
const router = express.Router();
const {userList,userCreate,userUpdate,userDelete} = require('../controllers/user-controller');
const multer = require("multer");
const {storage} = require("../middlewares/helperFunction");
const {check, validationResult} = require("express-validator");
const upload = multer({ storage: storage });
const {userValidator,validate} = require("../middlewares/user-validator"); 

router.get("/", upload.none(),userList);
router.get("/create",upload.single("image"),userValidator,validate,userCreate);
router.get("/update",userUpdate);
router.get("/delete",userDelete);

module.exports = router;
