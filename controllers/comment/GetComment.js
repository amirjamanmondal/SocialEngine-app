const jwt = require('jsonwebtoken')
const Comment = require('../../model/comment/Comment')
const Register = require('../../model/userModel/Register')


const GetComment = async (req, res) => {
    const token = req.cookies.token;
    const decodeToken = jwt.verify(token, process.env.secretKey)
    const userName = decodeToken.userName;

    const user = await Register.findOne({ userName: userName })
    if (!user) {
        return res.status(404).json({ message: `sender not found ` })
    }
    const comments = await Comment.find({ $or: [{ $and: [{ sender: user.name }, { reciever: req.params.name }] }, { $and: [{ sender: req.params.name }, { reciever: user.name }] }] })
    if (!comments.length) {
        return res.status(404).json({ message: 'messages not found' })
    }
    res.status(200).json({ message: `${comments.length} conversations found`, comments })
}

module.exports = GetComment;