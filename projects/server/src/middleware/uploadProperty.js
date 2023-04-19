// Import Multer
const {multerUpload} = require('../lib/multer')

const {sequelize} = require('../sequelize/models/index')
// import DeleteFiles
const deleteFiles = require('../helpers/deleteFilesProperty')


const uploadImages = async(req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'PROPERTY', maxCount: 4}])

    multerResult(req, res, function(err){
        console.log(req.files)
        try {
            if(err) throw err
            // check if files from BE is empty
            if (Object.keys(req.files).length === 0) {
                throw { message: 'Please upload your photo' };
            }
            req.files.PROPERTY.forEach((value) => {
                if(value.size > 10000000) throw {message: `${value.originalname} size is to large`, fileToDelete: req.files}

            })

            next()

        } catch (error) {
            if(error.fileToDelete){
                deleteFiles(error.fileToDelete)
            }

            return res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = uploadImages