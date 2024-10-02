const bcrypt = require('bcrypt')
const Register = require('../../../model/userModel/Register')
const Image = require('../../../model/imageModel/Image');
const generateTokenandSetCookie = require('../../../utils/generateTokenSetCookies');


const UserSignup = async (req, res) => {
    try {
        const { name, userName, email, password, confirmPassword, gender } = req.body;
        
        if (!req.body) {
            return res.status(204).json({ message: 'no input provided' })
        }
        const findUser = await Register.findOne({ userName: req.body.userName })

        if (findUser) {
            return res.status(409).json({ message: 'Already a user', findUser })
        }

        const images = await Image.find({username: userName});
        const countImage = images.length;
        
        // hash the password using bcrypt package
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRound);
        
        const user = new Register({
            name: name,
            userName: userName,
            email: email,
            password: hashedPassword,
            gender: gender,
            gallery: countImage
        })

        if (user) {
            await user.save();
            generateTokenandSetCookie(user.id, res);
            res.status(201).json({ message: "User created Successfully", _id: user._id, username: user.userName })
        }else{
            res.status(400).json( {error:"invalid user data"})
        }
    } catch (error) {
        const err = error.message;
        res.status(500).json({ err })
    }
}









module.exports = UserSignup;