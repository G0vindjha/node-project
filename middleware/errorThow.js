const getError = (error,res) => {
    const errorData = Object.values(error.errors).map(err => err.message);
    res.send(errorData);
};

const showExpressError = (error,res) => {
    const errorData = error.array().map(err => err.msg).toString();
    res.send(errorData);
};

module.exports = {getError,showExpressError};