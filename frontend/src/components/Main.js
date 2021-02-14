import Memes from './Memes'

const Main = ({memes}) => {

    return (
        <div className = 'main-class'>
            <Memes memes = {memes} />
        </div>
    )
}

export default Main;