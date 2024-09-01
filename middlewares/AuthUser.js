const jwt = require('jsonwebtoken')


const AuthUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    jwt.verify(token, process.env.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden Access' })
        }

        req.user = user;
        next()
    })


}


module.exports = AuthUser;