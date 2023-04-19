const webToken = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    createToken: (payload) => {
        return webToken.sign(payload, 'rahasia', {
            expiresIn: '24h'
        })
    },

    validateToken: (token) => {
        return webToken.verify(token,  'rahasia')
    }
}
