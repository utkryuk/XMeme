import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import AddMemeForm from './AddMemeForm'

const AddMemeButton = ({memes, setMemes}) => {
    
    const [addMemeToggle, setAddMemeToggle] = useState(false)

    const addMemeForm = (event) => {
        event.preventDefault()
        console.log('hello from console')
        setAddMemeToggle((addMemeToggle) ? false: true)
    }

    if (addMemeToggle) {
        return (
            <div>
                <div className='close-form-btn'>
                    <Button variant='danger' onClick={addMemeForm}>Close</Button>
                </div>
            <AddMemeForm memes={memes} setMemes={setMemes}/>
            </div>
        )
    }

    else {
        return (
            <div>
                <div className='close-form-btn'>
                    <Button variant='success' onClick={addMemeForm}>Add Meme</Button>
                </div>
            </div>
        )
    }
}

export default AddMemeButton;