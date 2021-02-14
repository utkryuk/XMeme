const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const memeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
})

// Enforces the validation
memeSchema.plugin(uniqueValidator)

memeSchema.set('toJSON', {
    transform : (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString(),
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Meme', memeSchema)