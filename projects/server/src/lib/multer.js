// import Multer
const multer = require('multer')
// import File System
const fs = require('fs')
const path = require("path");

// 1. setup Disk Storage & Filename
let defaultPath = path.join(__dirname,'../Public');
var storage =  multer.diskStorage({
    destination: async(req, file, cb) => {

        // Check Directory (exist or NOT)
        let isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`)

        if(!isDirectoryExist){
            await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {recursive: true});
        }

        // TO create "Public/pdf" or "Public/images"
        if(file.fieldname === 'files'){
            cb(null, `${defaultPath}/${file.fieldname}`)
        }
        if(file.fieldname === 'PROPERTY'){
            cb(null, `${defaultPath}/${file.fieldname}`)
        }
    },
    filename: (req, file, cb) => {
        cb(null, 'PIMG' + '-' + Date.now() + Math.round(Math.random() * 1000000000) + '.' + file.mimetype.split('/')[1])
    }
})

// Setup file filter
var fileFilter = (req, file, cb) => {
    if(file.mimetype.split('/')[0] === 'image'){
        // accept
        cb(null, true)
    }else if(file.mimetype.split('/')[0] !== 'image'){
        // Reject
        cb(new Error('File Must Be An Image!'))
    }
}

exports.multerUpload = multer({storage: storage, fileFilter: fileFilter})
