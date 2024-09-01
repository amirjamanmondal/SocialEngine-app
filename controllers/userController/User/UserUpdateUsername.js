const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')

const UserUpdateUsername = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const signedUserName = decodedToken.userName;
        const user = await Register.findOne({ userName: signedUserName })
        if (!user) {
            return res.status(404).json({ message: "user not found in database" })
        }
        const { userName } = req.body.userName;
        user.userName = userName
        user.save();
        res.status(200).json({ message: 'Username updated successfully' })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
    }
}

module.exports = UserUpdateUsername;