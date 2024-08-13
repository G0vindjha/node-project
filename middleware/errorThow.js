const getError = (error,res) => {
    const errorData = Object.values(error.errors).map(err => err.message);
    res.send(errorData);
};

module.exports = {getError};