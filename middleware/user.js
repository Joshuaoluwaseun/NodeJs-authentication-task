
module.exports = function (req, res, next) {
    if (!req.user.isUser) 
    return res.status(403).send('You have been denied access!');

    next()
}