const bcrypt = require('bcrypt')
const saltRounds = 10;

// hashPassword function : function untuk melakukan hashing pada password yang diterima
const hashPassword = async(password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        return null
    }
};

// hashmatrch function untuk melakukan pengecekan dari password yang diinput dengan password yang ada didatabase

const hashMatch =  async (password, hashedPassword) => {
    try {
        let match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        return false
    }
};

module.exports = {
    hashPassword, hashMatch
}