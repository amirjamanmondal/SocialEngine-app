const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../../../model/userModel/Admin')
const Register = require('../../../model/userModel/Register')


const AdminUserSignup = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(404).json({ message: 'no input provided by user' })
        }

        var { name, email, gender, password } = req.body;

        const hashed = await bcrypt.hash(password, 10)

        var user = new Admin({
            name: name,
            email: email,
            gender: gender,
            password: hashed,
        })
        const saveUser = await user.save()
        res.status(200).json({ message: `user created success`, saveUser })
    } catch (error) {
        const err = error.message;
        console.error({ error: error.message });
        res.status(500).json({ err })
    }
}

const AdminUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!req.body) {
            return res.status(401).json({ message: error.message })
        }

        const user = await Admin.findOne({ email: email })

        if (!user || user.length === 0) {
            return res.status(404).json({ message: 'user not found' })
        }

        bcrypt.compare(password, user.password)


        const token = jwt.sign({ email, password }, process.env.secretKey, { expiresIn: '1h' })

        res.cookie('token', token);

        res.status(200).json({ message: `user login successful `, token })
    }
    catch (error) {
        const err = error.message;
        console.error({ error: error.message });
        res.status(500).json({ err })
    }
}


const logoutUser = (req, res) => {
    try {
        const cookies = req.cookies.token;
        res.clearCookie('token')
        res.status(200).json({ message: 'Logged out successfully ' })
    } catch (error) {
        const err = error.message;
        console.error({ error: error.message });
        res.status(500).json({ err })
    }
}


const GetAlluser = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)
        const emailId = decodedToken.userCredential.emailId;

        // const user = await Admin.findOne({name: emailId})

        const users = await Register.find()

        if (!users) {
            return res.status(404).json({ message: `user not found ` })
        }

        res.status(200).json({ users })

    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
        console.error(errorMessage);

    }
}

const AdminUserController = { AdminUserSignup, AdminUserSignin, logoutUser, GetAlluser }


module.exports = { AdminUserController };