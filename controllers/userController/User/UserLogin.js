const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Register = require('../../../model/userModel/Register')



const UserSignin = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!req.body) {
            return res.status(401).json({ message: error.message })
        }
        const user = await Register.findOne({ userName: userName })

        if (!user) {
            return res.status(401).json({ message: 'user not found and failed to login' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Password is invalid ' })
        }

        const token = jwt.sign({ userName, password }, process.env.secretKey, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: `user login successful `, token })

    } catch (error) {
        const err = error.message;
        res.status(500).json(err)
    }
}


module.exports = UserSignin;