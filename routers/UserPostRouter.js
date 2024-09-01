const express = require('express')
const AuthUser = require('../middlewares/AuthUser')
const router = express.Router();
const PublishPost = require('../controllers/post/PublishPost')
const upload = require('../utils/postUploader')

router.post('/post', AuthUser, upload.single('post'), PublishPost)
// router.get('/home', AuthUser,)
// router.delete('/post/:id', AuthUser,)

const PostRouter = router;
module.exports = { PostRouter };