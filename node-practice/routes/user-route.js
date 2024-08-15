const express = require('express');
const router = express.Router();
const {userList,userCreate,userUpdate,userDelete} = require('../controllers/user-controller');
const multer = require("multer");
const {storage} = require("../middlewares/helperFunction");
const upload = multer({ storage: storage });


router.get("/", userList);
router.get("/create",upload.single("image"),userCreate);
router.get("/update",userUpdate);
router.get("/delete",userDelete);

module.exports = router;
