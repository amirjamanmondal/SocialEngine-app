const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')


const UserUpdateName = async (req, res) => {
    try {
        const name = req.body.name;
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({ message: 'no user detected ' })
        }
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })
        user.name = name;
        user.save();
        res.status(200).json({ message: `user password updated successfully `, name })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: `Error message from backend server -- ${errorMessage}` })
        console.error(errorMessage);

    }
}


module.exports = UserUpdateName;