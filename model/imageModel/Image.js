const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    fileName: {
        type: String,
        required: true,
    },
    pathUrl: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    comments: {
        type: Array,

    }
}, { timestamps: true })

const Image = mongoose.model('Image', imageSchema)

module.exports = Image;