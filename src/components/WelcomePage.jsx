import "../welcome.css"
function WelcomePage(props){

    return(
        <>
        <div className="Welcome--container">
                <h2 className="welcome--title">QUIZZICAL</h2>
               <button className="start--button" onClick={()=>props.toggleStart(true)}>START GAME</button>
       </div>
        </>
    )
}

export default WelcomePage