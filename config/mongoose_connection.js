const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_DB)
        .then(() => console.log("Connected"))
        .catch(err => console.log("Connection error:", err));
