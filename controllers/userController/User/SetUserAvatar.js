const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')



const SetUserAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({ message: 'no file choosen ' })
        }
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })
        user.avatar = `http://localhost:8000/avatar/${req.file.filename}`;
        user.save();
        res.status(200).json({ message: `avatar updated successfully ` });
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
        console.log(errorMessage);
    }
}


module.exports = SetUserAvatar;