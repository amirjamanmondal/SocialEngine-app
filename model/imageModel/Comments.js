const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        unique: true
    },
    chat: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    reply: {
        type: Array
    },
    likes: {
        type: Number
    },


}, { timestamps: true })

const Comment = mongoose.model('Comment', commentsSchema)

module.exports = Comment;