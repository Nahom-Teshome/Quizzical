import { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import QuizPage from './components/QuizPage'
import background from "./assets/human-mind.jpg"
import {nanoid }from "nanoid"
// import './App.css'

function App(){
    const [start ,setStart]= useState(false)
    function startGame(on){
      setStart(on)
    }
  return(
    <>
    
    
     {!start && <WelcomePage toggleStart={startGame}/>}
      {start && <QuizPage/>}
    </>
  )
}
export default App