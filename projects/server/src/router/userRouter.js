const express = require('express')
const Router = express.Router()

const {userController} = require('../controller')
const upload = require('./../middleware/upload')

const jwtVerify = require('./../middleware/decrypt')

Router.post('/register', userController.register)
// Router.post('/register-google', userController.authGoogle)
Router.post('/activation/:id', userController.activation)
Router.post('/resend-otp/:id', userController.resendOtp)
Router.post('/login', userController.Login)
Router.post('/keep-login', jwtVerify, userController.keepLogin)
Router.post('/user-profile', jwtVerify, userController.getUser)
Router.patch('/edit', jwtVerify, userController.updateUser)
Router.patch('/profile-picture', jwtVerify, upload, userController.editProfilePict)
Router.post('/change-password', jwtVerify, userController.changedPassword)
Router.post('/forget-password', userController.forgotPassword)
Router.post('/reset-password/:id', userController.resetPassword)


module.exports = Router;    