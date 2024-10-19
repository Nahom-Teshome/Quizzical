import { useState, useEffect} from 'react'
import QA from "./QA" 
import "../Quiz.css" 
import {nanoid} from "nanoid"
// import he from "he"


function QuizPage(){

    const [question, setQuestion] = useState([])//state to get questions
    const [loading,setLoading] = useState(true)
    const [errorRes, setError] = useState(null)
    const [compeletQuestion, setCompeletQuestion]  = useState([])//to get an object of question choices and correct answers
    const [reveal, setReveal] = useState(false)// to reveal the score
    const [score , setScore]  = useState(0)//to set the score
    const [restart, setRestart] = useState(false)// to use as a dependency to fetch new questions and restart game
        useEffect(()=>{
            const fetching = async()=>{

            try{
           const response=  await fetch(' https://the-trivia-api.com/v2/questions')
            
                if(!response.ok){
                    throw new Error("NETWORK RESPONSE IS NOT OKAY")
                }
              const data = await response.json()
              const fiveData =[] 
              
              for(let i=0;i<5;i++){ // to ensure only five questions come in
                    fiveData.push(data[i])
            }
             setQuestion(fiveData)
              
            }
            catch(error){
                setError(error)
                
            }
            finally{
              
                setLoading(false)
            
            }
        }
        fetching()
        },[restart])
    
        useEffect(()=>{
            // seting complete questions with the an object of question,choices and correct answer
          const Question= question.map(ques=> {

                const quest= ques.question.text
                ques.incorrectAnswers.push( ques.correctAnswer)
                const answers = ques.incorrectAnswers
                const choices =[]
                while( choices.length<4 )// adding the correct answer at random
                {
                   const rand=  Math.floor(Math.random()*4)
                       if(choices.find(element => element.value ===answers[rand])){
                           continue
                       }
                       else{
                           choices.push({value:answers[rand],id: nanoid(),chosen:false})
                       }
                }
     
                return { Q: quest, A: choices,ID:ques.id, answer: ques.correctAnswer };//returing complete questions object and storing it in Question
            })
            setCompeletQuestion(Question)// setting the complete question to state
        },[question])// dependency is questions b/c we want to set state everytime question is re populated
    
        if(loading)
        {
            return(
                <h1 className="loading">...loading </h1>
            )
        }
        if(errorRes)
        {
            return(
                <div className="error"><h1>{errorRes.message}</h1></div>
            )
        }
      
    function toggle(id,ID){
        //changing the chosen property of the selected choice to be true
       !reveal&& setCompeletQuestion(prev =>{
            const newQuest= []
            for(let i = 0; i<prev.length; i++)
            {
                //creating a new object variable to store the updated array of choice(prev[i].A)
                const newAnswer=prev[i].A.map(ans=>{
                    return (ans.id=== id)? {...ans,chosen:!ans.chosen}:{...ans,chosen:false}})//loops over choices and sees if the id of the selected matches to the id of the current choice and if it true it changes the chosen property and if not it changes only the chosen property to false ensuring only one can be set to true
                    if(prev[i].ID === ID )
                    {// if we are in the selected question we update it using the above object
                  newQuest.push( { ...prev[i],A:newAnswer} )
                    }
                    else{
                        //if not, push it in as it is
                        newQuest.push({...prev[i]})
                    }
             }
            
            return newQuest
        })
    }
    
    const QUESTION = compeletQuestion.map((comp,index)=>{
        return index <5 &&
        < QA
           key={index}
           question={comp.Q}
           choice={comp.A}
           answer={comp.answer}
           toggle={toggle}
           qId={comp.ID}
           reveal={reveal}
        />
    })
    function revealAnswers(){
        setReveal(true) //this we display all correct answers 
            let count=0
            let value =[] 
            for(let i=0; i< compeletQuestion.length;i++)
                {

              compeletQuestion[i].A.map(selected => {
               selected.chosen && value.push(selected.value)
               //here we are collecting the values of the selected choices to then compare them with the correct answer
              })   
             }

             for(let i = 0; i<compeletQuestion.length;i++)
             {
                value.map(val => {
                    val === compeletQuestion[i].answer && count++
                    //we compare the selected choice's value to then increment count if true
                })
             }

        setScore(count)// we set count to display the score

    }
    function resetGame(){
        setRestart(prev => !prev)//changing state to reload the first useEffect. it's toggling prev b/c we want it to hide the score 
        setReveal(false)// b/c we don't want the answers showing when the new questions appear
    }

    return(
        <>
            
                {QUESTION}
            <div className="button--container">
            {reveal && <h3>{`You scored ${score}/5 correctly`}</h3>}
            { reveal? <button className="submit--button" onClick={resetGame}>     {"Play Again"}</button>:
                    <button className="submit--button" onClick={revealAnswers}> {"Check Answers"}</button>
            }
            </div>
           <div>
             {reveal && <p>{score}</p>}
           </div>
        </>
    )
}
export default QuizPage