const express = require('express')
const AuthUser = require('../middlewares/AuthUser')
const PublishPost = require('../controllers/post/PublishPost')
const upload = require('../utils/postUploader')
const DeletePost = require('../controllers/post/DeletePost')
const GetAllPosts = require('../controllers/post/GetAllPosts')

const router = express.Router();

router.post('/post', AuthUser, upload.single('post'), PublishPost)
router.delete('/post/:id', AuthUser, DeletePost)

router.get('/post', AuthUser, GetAllPosts)

const PostRouter = router;
module.exports = { PostRouter };