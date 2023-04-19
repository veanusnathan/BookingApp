const express = require('express')
const Router = express.Router();

const {tenantController} = require('../controller')

const upload = require('../middleware/upload')
const jwtVerify = require('./../middleware/decrypt')

Router.post('/register', upload, tenantController.register)
Router.post('/tenant-activation/:id', tenantController.activation)
Router.post('/resend-otp/:id', tenantController.resendOtp)
Router.post('/login', tenantController.Login)
Router.post('/keep-login', jwtVerify, tenantController.keepLogin)
Router.post('/tenant-profile', jwtVerify, tenantController.getTenant)
Router.patch('/tenant-edit', jwtVerify, tenantController.updateTenant)
Router.patch('/change-picture', jwtVerify, upload, tenantController.editProfilePict)
Router.post('/change-password', jwtVerify, tenantController.changePassword)
Router.post('/forget-password', tenantController.forgotPassword)
Router.post('/reset-password/:id', tenantController.resetPassword)


module.exports = Router;