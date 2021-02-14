import './App.css';
import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import AddMemeButton from './components/AddMemeButton'
import Main from './components/Main'
import memesService from './services/memes'

const App = () => {

  const [memes, setMemes] = useState([])

  const memeHook = () => {
      memesService.getAll()
          .then(allMemes => {
              setMemes(allMemes)
          })
  }

  useEffect(memeHook, [])

  return (
    <div>
      <Header/>
      <AddMemeButton memes = {memes} setMemes = {setMemes}/>
      <Main memes = {memes}/>
      <Header />
    </div>
  );
}

export default App;
