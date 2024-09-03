const jwt = require('jsonwebtoken')
const Register = require('../../../model/userModel/Register')

const DeleteUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)

        const userName = req.params.username;
        const user = await Register.findOneAndDelete({ userName: userName })

        if (!user) {
            return res.status(401).json({ message: 'Unable to delete the user ' })
        }
        res.status(200).json({ message: `${user.name} user deleted successfully by ${decodedToken.email}` })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: errorMessage })
        console.error({ error: errorMessage });
    }
}

module.exports = DeleteUser;