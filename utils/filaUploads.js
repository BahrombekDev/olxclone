const multer  = require('multer')
const path = require('path')
// const upload = multer({ dest: 'uploads/' })

//Set storage

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Initilaize upload
const upload = multer({
    storage,
    limits: {fileSize:10000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

//chek file for image
function checkFileType(file,cb){
    const fileTypes = /jpg|jpeg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error: You can only upload image file')
    }
}

module.exports = upload