import React from 'react'
import Meme from './Meme'

const Memes = ({memes}) => {

    return (
        <div className='memes-container'>
            {memes.map((meme) => {
                return <Meme key={meme.id} meme = {meme} />
            })}
        </div>
    )
} 

export default Memes;