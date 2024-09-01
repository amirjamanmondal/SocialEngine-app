const jwt = require('jsonwebtoken')
const Post = require('../../model/post/Post')
const Register = require('../../model/userModel/Register')


const PublishPost = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })

        const { type, title } = req.body;
        const data = {
            filename: req.file.filename,
            url: `/posts/${req.file.filename}`
        };
        if (!user) {
            return res.status(401).json({ message: 'failed to get user information ' })
        }

        if (!req.body) {
            return res.status(204).json({ message: 'content body  type or title is empty' })
        }

        const postContent = new Post({
            name: user.name,
            userName: user.userName,
            avatar: user.avatar,
            content: {
                type: type,
                title: title,
                data: data
            }
        })

        await postContent.save();
        res.status(200).json({ message: 'post is published', postContent })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
        console.error({ errorMessage });
    }
}

module.exports = PublishPost;