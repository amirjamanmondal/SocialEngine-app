const jwt = require('jsonwebtoken')
const Post = require('../../model/post/Post')

const GetAllPosts = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey)
        const userName = decodedToken.userName;

        const allPosts = await Post.find({ userName: userName })


        if (!allPosts.length) {
            return res.status(204).json({ message: 'No post are found' })
        }

        res.status(200).json({ message: `${allPosts.length} post found`, allPosts })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
        console.error({ errorMessage });

    }
}

module.exports = GetAllPosts;