const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')


const UserUpdateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })
        if (!user) {
            return res.status(404).json({ message: "user not found in database" })
        }
        user.email = email
        user.save();
        res.status(200).json({ message: 'Email updated successfully ' });
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
    }
}


module.exports = UserUpdateEmail;