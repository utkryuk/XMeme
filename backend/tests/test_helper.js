const Meme = require('../models/meme')

const initialMemes = [
    {
        _id: '5a422b3a1b54a676234d17f9',
        name: 'Saurav',
        caption: 'memer no. 1',
        url: 'http://example.com',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        name: 'Captain America',
        caption: 'give this man a shield',
        url: 'http://avengers.com',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        name: 'Joey',
        caption: 'How you doing?',
        url: 'http://friends.com',
        __v: 0
    }
]

const memesInDb = async () => {
    const allMemes = await Meme.find({})
    
    return allMemes.map(meme => meme.toJSON())
}

module.exports = {
    initialMemes, memesInDb
}