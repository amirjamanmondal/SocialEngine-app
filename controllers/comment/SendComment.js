const jwt = require('jsonwebtoken')
const Register = require('../../model/userModel/Register')
const Comment = require('../../model/comment/Comment')

const SendComment = async (req, res) => {
    try {
        if (!req.body || !req.params) {
            return res.status(404).json({ message: `no body or sender found ` })
        }
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;

        const sender = await Register.findOne({ userName: userName })
        const reciever = await Register.findOne({ userName: req.params.username });
        // const senderConversation = await Comment.find({ sender: sender.name }).select('reciever comment')
        // const recieverConversation = await Comment.find({ reciever: reciever.name }).select('sender comment')

        if (!reciever) {
            return res.status(400).json({ message: `no user selected to send comment` })
        }

        if (sender.name === reciever.name) {
            return res.status(400).json({ message: `invalid operation perform by you` })
        }
        const comment = new Comment({
            sender: sender.name,
            reciever: reciever.name,
            comment: req.body.comment
        })

        const senderMessage = {
            reciever: comment.reciever,
            comment: comment.comment
        }
        const recieverMessage = {
            sender: comment.sender,
            comment: comment.comment
        }

        if (!comment) {
            return res.status(204).json({ message: `comment field is empty please type something` })
        }

        sender.messages = comment;

        sender.messages.push(senderMessage)
        reciever.messages.push(recieverMessage)

        // // need to revise this topic for understanding mongodb Session and Transaction
        await comment.save()
        await sender.save()
        await reciever.save()

        const comments = await Comment.find({ $and: [{ sender: sender }, { reciever: reciever }] })
        if (!comments) {
            return res.status(404).json({ message: `conversation not found` })
        }

        res.status(200).json({ comment })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ message: `Error from backend `, errorMessage })
        console.error(errorMessage);
    }
}


module.exports = SendComment;
