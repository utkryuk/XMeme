const memesRouter = require('express').Router()
const Meme = require('../models/meme')
const IResponse = require('../models/iResponse')

// get memes (upto 100)
memesRouter.get('/', async (request, response) => {
    
    let allMemes = await Meme
        .find({})
        .sort({_id: -1}) // _id field has date embedded in it and -1 will sort descending (newest to oldest.)
        .limit(100) // will limit the find to only 100 records

    return response.json(allMemes)
})

// post meme
memesRouter.post('/', async (request, response, next) => {

    const body = request.body

    const newMeme = new Meme({
        name: body.name,
        url: body.url,
        caption: body.caption
    })

    try {
        const savedMeme = await newMeme.save()
        const returnObj = new IResponse({
            id: savedMeme._id.toString()
        })
        const returnedObj = await returnObj.save()
        return response.json(returnedObj)
    }
    catch (exception) {
        next(exception)
    }
    
})


// get meme by Id
memesRouter.get('/:id', async (request, response, next) => {

    try {

        const getAMeme = await Meme.findById(request.params.id)
        return response.json(getAMeme)
    }
    catch(exception) {
        next(exception)
    }

})

module.exports = memesRouter