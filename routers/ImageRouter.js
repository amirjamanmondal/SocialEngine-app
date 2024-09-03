const express = require('express')
const upload = require('../utils/ImagesUpload')
const AuthUser = require('../middlewares/AuthUser')
const UploadImage = require('../controllers/imageController/UploadImage')
const DeleteImage = require('../controllers/imageController/DeleteImage')
const GetImages = require('../controllers/imageController/GetImages')



const router = express.Router()

router.post('/images/upload', AuthUser, upload.single('image'), UploadImage)
router.get('/images', AuthUser, GetImages)
router.post('/image/delete/:name', AuthUser, DeleteImage)
router.get('/image/:filename', AuthUser)



const routeImage = router;
module.exports = { routeImage };
// image upload, image delete, one image get, all images get, rename image file name 