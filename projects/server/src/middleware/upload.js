// Import Multer
const {multerUpload} = require('./../lib/multerUser')

const {sequelize} = require('./../sequelize/models/index')
// import DeleteFiles
const deleteFiles = require('./../helpers/deleteFiles')


const uploadImages = async(req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])

    multerResult(req, res, function(err){
        try {
            if(err) throw err
            // check if files from BE is empty
            if (Object.keys(req.files).length === 0) {
                throw { message: 'Please upload your photo' };
            }
            req.files.images.forEach((value) => {
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