const mongoose = require('mongoose')

const database = () => {
    mongoose.connect(process.env.db)
    .then(() => console.log(`database connected `))
    .catch((error) => console.error(error)
    )
}

module.exports = database;