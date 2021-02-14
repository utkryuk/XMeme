const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const iResponseSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    }
})

// Enforces the validation
iResponseSchema.plugin(uniqueValidator)

iResponseSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('IResponse', iResponseSchema)