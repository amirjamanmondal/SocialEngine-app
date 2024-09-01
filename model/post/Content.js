const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    type: {
        type: [String],
        required: true,
    },
    title: {
        type: String,
    },
    data: {
        type: Object,
        required: true,
        default: "data not provided by you"
    }
})

const Content = mongoose.model('Content', contentSchema)
module.exports = { Content, contentSchema };