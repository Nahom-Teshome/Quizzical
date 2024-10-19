import "../QUIZ.css"
function QA(props){
    

    return(
        <div className="bodyy">
            <div className="question--container" >
                    <h4  className="question">{props.question}</h4>
            </div>
            <div  className="choices--container">
                    {props.choice.map((a,ind)=>{
        const styles ={
                            backgroundColor:a.chosen?" rgb(203, 55, 80) ":"transparent"
                        }
       const styled={
                             backgroundColor:(a.value===props.answer)?"rgb(59, 211, 59)":a.chosen?" rgb(211, 5, 5) ":"transparent"
                             
       }
                        return(
                            <button style={props.reveal?styled:styles} onClick={()=>props.toggle(a.id,props.qId)} className ="choices" key={ind}>{a.value} </button>
                        )
                    })}
                       <p><b></b></p>
           </div>
           <hr />
        </div>
    )
}
export default QA
// {props.answer}