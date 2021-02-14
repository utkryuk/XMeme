require('dotenv').config()

const PORT = process.env.PORT || 8081

let MONGODB_URI = process.env.MONGODB_URI


if (process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    PORT,
    MONGODB_URI
}
