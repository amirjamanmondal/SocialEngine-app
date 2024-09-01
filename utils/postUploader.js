const fs = require('fs')
const multer = require('multer')

const avatarFilePath = './upload/post'

const Accessed = fs.existsSync(avatarFilePath)
if (!Accessed) {
    fs.mkdirSync(avatarFilePath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarFilePath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    },

})

const upload = multer({
    storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files JPEG, PNG, GIF are allowed '))
        }
    }
});

module.exports = upload;
