const express = require('express')
const { AdminUserController } = require('../controllers/userController/Admin/AdminUser')
const AuthUser = require('../middlewares/AuthUser')


const router = express.Router()

router.post('/signup', AdminUserController.AdminUserSignup)
router.post('/login', AdminUserController.AdminUserSignin)
router.get('/logout', AuthUser, AdminUserController.logoutUser)
router.get('/register', AuthUser, AdminUserController.GetAlluser)
router.delete('/:username')
router.put('/username/edit')

module.exports = router;