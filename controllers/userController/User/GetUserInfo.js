const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')



const GetUserInfo = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const findUser = await Register.findOne({ userName: userName })

        res.status(200).json(findUser);

    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
        console.log(errorMessage);
    }

}


module.exports = GetUserInfo;