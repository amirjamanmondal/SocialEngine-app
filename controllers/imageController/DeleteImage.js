// const img = require('../../upload/images/')
// const path = '../../upload/image'
const fs = require('fs')
const Register = require('../../model/userModel/Register')
const Image = require('../../model/imageModel/Image')
const jwt = require('jsonwebtoken')
const { log } = require('console')
// const img = require( )

const DeleteImage = async (req, res) => {
    try {
        const name = (req.params.name);

        if (!name) {
            return res.status(400).json({ message: `invalid index is not a number ` })
        }
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })

        const images = await Image.findOneAndDelete({ $and: [{ username: user.name }, { fileName: name }] });
        if (!images) {
            return res.status(404).json({ message: `your image is not found ` })
        }

        const dir = `./upload/images/${name}`

        fs.unlinkSync(dir)
        const imagesRemain = await Image.find({ username: user.name }).length
        res.status(200).json({ message: `${imagesRemain} images are remain ` })

    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
        console.error({ errorMessage });
    }


}


module.exports = DeleteImage;