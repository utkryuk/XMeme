const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const express = require('express')

// to allow cors request
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const memesRouter = require('./controllers/memes')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI

const databaseConnect = async (mongoUrl) => {
    
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        logger.info('Connected to MongoDB')
    }
    catch (exception){
        logger.error(exception)
    }
}

databaseConnect(mongoUrl)

// We only want request logging in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(middleware.requestLogger)
}

app.use('/memes', memesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app