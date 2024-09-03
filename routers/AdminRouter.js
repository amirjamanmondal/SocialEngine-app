const express = require('express')
const { AdminUserController } = require('../controllers/userController/Admin/AdminUser')
const AuthUser = require('../middlewares/AuthUser')

const DeleteUser = require('../controllers/userController/Admin/DeleteUser')
const GetUserOne = require('../controllers/userController/Admin/GetUserOne')


const router = express.Router()

router.post('/signup', AdminUserController.AdminUserSignup)
router.post('/login', AdminUserController.AdminUserSignin)
router.get('/logout', AuthUser, AdminUserController.logoutUser)
router.get('/register', AuthUser, AdminUserController.GetAlluser)
router.delete('/delete/:username', AuthUser, DeleteUser)
router.get('/users/:username', AuthUser, GetUserOne)


module.exports = router;