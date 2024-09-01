const UserSignup = require('./UserSignup')
const UserSignin = require('./UserLogin')
const UserLogout = require('./UserLogout')
const UserUpdateName = require('./UserUpdateName')
const UserUpdateEmail = require('./UserUpdateEmail')
const UserUpdateUsername = require('./UserUpdateUsername')
const UserUpdatePassword = require('./UserUpdatePassword')
const SetUserAvatar = require('./SetUserAvatar')
const GetUserInfo = require('./GetUserInfo')



const RegisterUser = {
    UserSignup,
    UserSignin,
    UserLogout,
    UserUpdateUsername,
    UserUpdateEmail,
    UserUpdatePassword,
    UserUpdateName,
    SetUserAvatar,
    GetUserInfo,
}

module.exports = RegisterUser;


