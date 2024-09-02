const jwt = require('jsonwebtoken')
const fs = require('fs')
const Post = require('../../model/post/Post')

const DeletePost = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)
        const userName = decodedToken.userName;

        const selectPost = await Post.findById({ _id: req.params.id })
        if (!selectPost) {
            return res.status(204).json({ message: 'content not found ' })
        }
        const filename = selectPost.content.data.filename;
        const dir = `./upload/post/${filename}`

        fs.access(dir, fs.constants.R_OK, (err) => {
            if (err) {
                console.error('Error accessing file:', err);
            } else {
                console.log('File is readable');
            }
        });

        fs.unlinkSync(dir)
        const selectPostToDelete = await Post.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: `content deleted successfully`, userName })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage, })
    }

}

module.exports = DeletePost;