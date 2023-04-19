const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gigijcwd230203@gmail.com', //email sender
        pass: 'wfrbaqcogxzpgwby' // key generate by google email
    },
    tis: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
