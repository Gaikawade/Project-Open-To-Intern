exports.sendError = (res, err, statusCode = 401) => {
    res.status(statusCode).json({ error_msg: err.message || err });
};

exports.errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message || err });
};
