const express = require('express')
const AuthUser = require('../middlewares/AuthUser')
const SendComment = require('../controllers/comment/SendComment')
const GetComment = require('../controllers/comment/GetComment')

const router = express.Router()

router.post('/send/:username', AuthUser, SendComment)
router.get('/comments/:name', AuthUser, GetComment)

const CommentRouter = router;
module.exports = { CommentRouter };