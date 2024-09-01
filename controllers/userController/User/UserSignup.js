const bcrypt = require('bcrypt')
const Register = require('../../../model/userModel/Register')
const Image = require('../../../model/imageModel/Image')


const UserSignup = async (req, res) => {
    try {
        const { name, userName, email, password, confirmPassword, gender } = req.body;
        if (!req.body) {
            return res.status(204).json({ message: 'no input provided' })
        }
        const findUser = await Register.find({ userName: req.body.userName })

        if (!findUser || req.body.password !== confirmPassword) {
            return res.status(404).json({ message: 'no user found' })
        }
        const images = await Image.find({ username: req.body.name });
        const countImage = images.length;
        // hash the password using bcrypt package
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const user = new Register({
            name: name,
            userName: userName,
            email: email,
            password: hashedPassword,
            gender: gender,
            gallery: countImage
        })
        const savedUser = await user.save();
        res.status(200).json({ message: 'user created successfully ', savedUser })
    } catch (error) {
        const err = error.message;
        // const result = ErrorDeStructure(err);
        // console.log(result);
        res.status(500).json({ err })
    }
}









module.exports = UserSignup;