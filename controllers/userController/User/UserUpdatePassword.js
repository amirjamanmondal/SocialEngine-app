const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')
const bcrypt = require('bcrypt')


const UserUpdatePassword = async (req, res) => {
    try {
        const password = req.body.password;
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const comparePassword = decodedToken.password;
        console.log(decodedToken);

        const user = await Register.findOne({ userName: "habiba" })
        if (!user) {
            return res.status(401).json({ message: 'user not found in database' })
        }

        const check = bcrypt.compare(comparePassword, user.password);
        if (!check) {
            return res.status(401).json({ message: 'not match the password ' })
        }


        const saltRound = 10;
        const hashed = await bcrypt.hash(password, saltRound)
        try {
            user.password = hashed;
            user.save();
            res.status(200).json({ message: `user password updated successfully` })
        } catch (error) {
            res.status(401).json({ error: 'not found' })
        }
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: `Backend server error ${errorMessage}` })
        console.error(errorMessage);
    }
}

module.exports = UserUpdatePassword;