const Register = require('../../../model/userModel/Register')


const GetallUser = async (req, res) => {
    try {

        const users = await Register.find({});

        if (!users) {
            return res.status(401).json({ message: 'no user found ' })
        }
        res.status(200).json(users)
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
        console.error({ errorMessage });
    }
}

module.exports = GetallUser;