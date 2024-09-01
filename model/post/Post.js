const mongoose = require('mongoose')
const { contentSchema } = require('../../model/post/Content')

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
    content: {
        type: contentSchema,
        required: true
    },
    like: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: Array,
    }
}, { timestamps: true })


const Post = mongoose.model('Post', postSchema)

module.exports = Post;