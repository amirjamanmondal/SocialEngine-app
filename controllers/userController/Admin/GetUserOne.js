const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')

const GetUserOne = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)

        const user = await Register.findOne({ userName: req.params.username })

        if (!user) {
            return res.status(401).json({ message: 'user not found ' })
        }
        res.status(200).json({ message: `${user.name} user found `, user })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage })
        console.error({ message: errorMessage });
    }
}

module.exports = GetUserOne;