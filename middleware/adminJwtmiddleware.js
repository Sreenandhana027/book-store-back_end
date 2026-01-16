const jwt = require('jsonwebtoken')

const adminjwtMiddleware = (req, res, next) => {
    console.log("Inside adminjwt middleware");
    console.log(req.headers.authorization.slice(7));
    try {
        const token = req.headers.authorization.slice(7)
        const jwtVerification = jwt.verify(token, process.env.jwtKey)
        console.log(jwtVerification);
        req.payload = jwtVerification.userMail
        req.role=jwtVerification.role
        if (req.role =="Admin") {
            next()
        }
        else {
            res.status(403).json("Authorization failed...only access for Admin")
        }
    }
    catch (err) {
        res.status(402).json("Authorization error" + err)
    }
}
module.exports = adminjwtMiddleware;