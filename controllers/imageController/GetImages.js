const jwt = require('jsonwebtoken')
const Register = require('../../model/userModel/Register')
const Image = require('../../model/imageModel/Image')

const GetImages = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })

        const name = user.name;

        const images = await Image.find({ username: name })

        if (!images.length) {
            return res.status(404).json({ message: `No images found ` })
        }

        res.status(200).json({ message: `${images.length} images found`, images })

    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: `Error from backend`, errorMessage })
        console.error(errorMessage);

    }
}

module.exports = GetImages;