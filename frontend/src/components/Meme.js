import React from 'react'
import {Card, Button} from 'react-bootstrap'

const Meme = ({meme}) => {
    
    // const memeByIdHandler = (event, meme) => {
    //     console.log(meme)
    // }

    return (
        <div className='meme-item'>
            <Card style={{ width: '15rem'}}>
            <Card.Img variant="top" src={meme.url} className='meme-img'/>
            <Card.Body>
                <Card.Title>By {meme.name}</Card.Title>
                <Card.Text>{meme.caption}</Card.Text>
                {/* <Button variant="primary" onClick={(event) => memeByIdHandler(event, meme)}>Get This meme</Button> */}
            </Card.Body>
            </Card>
        </div>
    )
}

export default Meme;