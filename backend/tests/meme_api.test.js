const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Meme = require('../models/meme')
const helper = require('./test_helper')

beforeEach(async () => {

    await Meme.deleteMany({})

    for (const meme of helper.initialMemes) {
        let memeObj = new Meme(meme)
        await memeObj.save()
    }

})

describe('GET request', () => {
    test('receiving all memes', async () => {
        
        const response = await api
            .get('/memes')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(helper.initialMemes.length)

    })

    test('receiving empty array if no memes available', async () => {
        
        await Meme.deleteMany({})

        const response = await api
            .get('/memes')
            .expect(200)
        
        expect(response.body).toStrictEqual([])

    })

    test('receiving a single meme by sending correct id', async () => {

        const memesAtStart = await helper.memesInDb()

        const memeToView = memesAtStart[0]

        const returnedMeme = await api
            .get(`/memes/${memeToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(returnedMeme.body).toEqual(memeToView)
        
    })

    test('failing to receive meme because of passing wrong id', async () => {

        await api
            .get('memes/5a422b3a1b54a676234d17r5') // wrong id
            .expect(404)

    })
})

describe('POST request', () => {
    
    test('posting a meme', async () => {

        const memesAtStart = await helper.memesInDb()
        
        const newMeme = {
            name: 'Testing',
            url: 'www.testing.com',
            caption: 'hello there just testing the post request'
        }

        await api
            .post('/memes')
            .send(newMeme)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const memesAtEnd = await helper.memesInDb()

        expect(memesAtEnd).toHaveLength(memesAtStart.length + 1)

        const captions = memesAtEnd.map(meme => meme.caption)
        expect(captions).toContain(newMeme.caption)
    })

    test('posting a meme without name results in 400', async () => {

        const memesAtStart = await helper.memesInDb()
        
        const newMeme = {
            url: 'www.testing.com',
            caption: 'hello there just testing the post request'
        }

        await api
            .post('/memes')
            .send(newMeme)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const memesAtEnd = await helper.memesInDb()

        expect(memesAtEnd).toHaveLength(memesAtStart.length)

    })

    test('posting a meme without url results in 400', async () => {

        const memesAtStart = await helper.memesInDb()
        
        const newMeme = {
            name: 'Testing',
            caption: 'hello there just testing the post request'
        }

        await api
            .post('/memes')
            .send(newMeme)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const memesAtEnd = await helper.memesInDb()

        expect(memesAtEnd).toHaveLength(memesAtStart.length)

    })

    test('posting a meme without caption results in 400', async () => {

        const memesAtStart = await helper.memesInDb()
        
        const newMeme = {
            name: 'Testing',
            url: 'www.testing.com'
        }

        await api
            .post('/memes')
            .send(newMeme)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const memesAtEnd = await helper.memesInDb()

        expect(memesAtEnd).toHaveLength(memesAtStart.length)

    })

})

afterAll(() => {
    mongoose.connection.close()
})