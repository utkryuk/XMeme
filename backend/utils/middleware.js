const logger = require('./logger')

const requestLogger = (request, response, next) => {

    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({error: 'unknown Endpoint'})
}

const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(404).json({error: 'Meme not found'})
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    else if (error.name === 'MongooseError') {
        return response.status(500).json({error: 'Internal Server Error'})
    }
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
}