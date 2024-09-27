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
        const cookieOptions = {
            maxAge: 3600000, // 1 hour
            httpOnly: true,
            secure: true, // Use HTTPS for production
            sameSite: 'Lax'
        };

        res.cookie('token', token, cookieOptions);
        res.status(200).json({ message: `user login successful `, token, })


    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
    }
}


module.exports = UserSignin;


const userLoginbyHeader = async () => {
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
        const cookieOptions = {
            maxAge: 3600000, // 1 hour
            httpOnly: true,
            // secure: true, // Use HTTPS for production
        };

        res.cookie('token', token, cookieOptions);
        res.status(200).json({ message: `user login successful `, token, })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
    }
}