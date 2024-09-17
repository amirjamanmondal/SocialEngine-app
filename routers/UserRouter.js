const express = require('express')
const RegisterUser = require('../controllers/userController/User/UserControllers')
const AuthUser = require('../middlewares/AuthUser')
const upload = require('../utils/avataUpload')
const router = express.Router()


router.post('/signup', RegisterUser.UserSignup)
router.post('/login', RegisterUser.UserSignin)
router.post('/logout', AuthUser, RegisterUser.UserLogout)
router.put('/name/update', AuthUser, RegisterUser.UserUpdateName)
router.put('/username/update', AuthUser, RegisterUser.UserUpdateUsername)
router.put('/email/update', AuthUser, RegisterUser.UserUpdateEmail)
router.put('/password/update', AuthUser, RegisterUser.UserUpdatePassword)
router.put('/avatar/upload', AuthUser, upload.single('avatar'), RegisterUser.SetUserAvatar)
router.get('/', AuthUser, RegisterUser.GetUserInfo)
router.get('/all', RegisterUser.GetallUser)


const routerUser = router;

module.exports = { routerUser };