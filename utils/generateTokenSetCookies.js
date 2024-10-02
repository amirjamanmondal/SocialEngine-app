const jwt = require('jsonwebtoken')


function generateTokenandSetCookie (userId, res) {
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15D'
    })

    res.cookie(`token`,token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "Development"
    })
}

module.exports = generateTokenandSetCookie;