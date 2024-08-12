const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection error:", err));