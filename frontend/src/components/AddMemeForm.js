import React, {useState} from 'react'
import memesService from '../services/memes'

const AddMemeForm = ({memes, setMemes}) => {

    const [username, setUserName] = useState('')
    const [caption, setCaption] = useState('')
    const [memeURL, setMemeURL] = useState('')
 
    const handleNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handleCaptionChange = (event) => {
        setCaption(event.target.value)
    }

    const handleMemeURLChange = (event) => {
        setMemeURL(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        let newMeme = {name: username, url: memeURL, caption: caption}
        
        memesService.addMeme(newMeme)
            .then((responseMeme) => {
                let tempNewMeme = {...newMeme, id: responseMeme.id}
                // console.log(tempNewMeme)
                setMemes([tempNewMeme].concat(memes))
                console.log('It is added')
                setUserName('')
                setCaption('')
                setMemeURL('')
            })
    }

    return (
        <div className = 'form-container'>
            <div className = 'form-container-element' id='meme-form'>
                <h3>Add your meme</h3>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor='meme-name'>Name</label>
                    <input name='meme-name' type='text' value={username} placeholder='Enter your full name' onChange={handleNameChange} autoFocus required></input>
                    <label htmlFor='meme-caption'>Caption</label>
                    <input name='meme-caption' type='text' value={caption} placeholder='Enter your meme caption' onChange={handleCaptionChange} required></input>
                    <label htmlFor='meme-name'>Meme URL</label>
                    <input name='meme-url' type='url' value={memeURL} placeholder='Enter your meme url' onChange={handleMemeURLChange} required></input>
                    <label htmlFor='submit-btn'></label>
                    <input type='submit' value='Add' className='add-btn'></input>
                </form>
            </div>
            
        </div>
    )
}

export default AddMemeForm;