import {useState , useRef , useContext , useEffect, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/authContext'
import {Loader} from '../components/Loader'
import {useParams} from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {QuestionList} from '../components/QuestionList'

import {CreateQuestion} from '../components/CreateQuestion'
import {Link} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import {useSocket} from '../hooks/socket.hook'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import io from  'socket.io-client'
import { Prompt } from 'react-router-dom'


export const QuizGamePage = (props) =>{

    const {userName} = useContext(AuthContext)
    
    const fetched = props.location.state.fetchedResult
        
    const roomId = useParams().gameLink
    const {players , startGame , started , getNextQuestion ,  questions , submitQuiz , points , place} = 
        useSocket({roomId , quizName:fetched.quizName })

    const [anwsers , setAnwsers] = useState([])
    const [selected , setSelected] = useState('')
    const [done , setDone] = useState(false)
    const timeoutRef = useRef(null)
    const anwsersRef = useRef(anwsers)
    
    //Time out before quiz begins
    const [timeOutBeforeStart , setTimeoutBeforeStat] = useState(11)
    const [startTimeoutBeforeGame , setStartTimeoutBeforeGame] = useState(false)


    useEffect(()=>{
        if(started){
            timeoutRef.current = setTimeout(()=>{
                handleTimoutSubmit()
            } , 10000)
            timeoutRef.current = null
        }
    },[started])

    useEffect(() => {
        anwsersRef.current = anwsers
    },[anwsers])

    useEffect(() => {
        console.log('timer started?',startTimeoutBeforeGame)
        if(startTimeoutBeforeGame){
            if(timeOutBeforeStart > 0 ){

                setTimeout(() => setTimeoutBeforeStat(timeOutBeforeStart - 1), 1000);
            }else{
                startGame()
            }
        }
      }, [timeOutBeforeStart , startTimeoutBeforeGame]);

    


    const handleAnwser = () => {
    
        setAnwsers(
            anwsers.concat({questionDesc:questions.currentQuestion.questions.description ,
                            anwserGiven:selected }))

            

        if(anwsers.length === questions.suppliedQuestions.length-1){
            setDone(true)
        }else{
            getNextQuestion()
        }

    }

    const handleClickRadio = event =>{
        setSelected(event.target.id)
    }

    const handleSubmitQuiz = () =>{
        submitQuiz(anwsers)
    }

    const handleTimoutSubmit = () =>{
        setDone(true)
        submitQuiz(anwsersRef.current)
    }

    const handleStartClick = () => {
        setStartTimeoutBeforeGame(true)
    }
 
 
    const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <p className="timer">Time is out!</p>;
  }}


    if(!fetched.status === "OK" || !fetched)
    {
        return(
            <div>
                <h1>
                    401 Unauthorized access
                </h1>
            </div>
        )
    }
       

   

    return(
    
        <div>

        <Prompt message={ `Are you sure you want leave game? You will be disqualifed` } />

        <button onClick={()=>{
            console.log('place' , place)
            console.log('points' , points)
            console.log('anwsers' , anwsers)
        }} >test</button>
            <h1>
                Quiz "{fetched.quizName}"
            </h1>

            <div className="row">
                <div className="col s3 m3">
                <div className="card blue darken-2">
                    <div className="card-content white-text">
                    <span className="card-title">Participants</span>
                        <ul>
                            {
                                (players.length>0) ? players.map((name , i)=><li key={i}>{name}</li> )
                                                    : <li>Waiting for others</li>
                            }
                            <li>{userName}</li>
                        </ul>
                    </div>
                    
                   
                </div>
                {started && 
                    <div style={{marginLeft:'50px'}} className="timer-wrapper center-align">
                    <CountdownCircleTimer
                    size={100}
                    isPlaying
                    duration={10}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                    onComplete={() => [false]}
                    >
                    {renderTime}
                    </CountdownCircleTimer>
                    </div>
                    }
                </div>


                <div className="col s9 m9">
                <div className="card blue-grey darken-1" style={{minHeight:'400px'}}>

                    <div className="card-content center-align white-text">
                        <h6 className="card-title">
                            {!questions?"The game will begin when organizer will press start": `${questions.currentQuestion.questions.description}`}
                        </h6>
                    </div> 

                    {fetched.isAdmin && !started && !startTimeoutBeforeGame &&
                    <div  style={{marginTop:'50px'}} className="center-align ">
                        <button className="btn-large waves-effect  teal"
                             onClick={ handleStartClick }> {"Start"} 
                        </button>
                    </div>}

                    {started && questions && !(points === 0 || points ) &&
                    <div className="row">
                        <div className="col s12 m10 offset-m1">
                            <div className="card blue lighten-5">
                                <div className="card-content black-text">
                                {
                                    questions.currentQuestion.questions.alternatives.map(
                                        (option , i)=>  <div key={i} style={{marginTop:'10px' , marginBottom:'10px'}}>
                                                            <label>
                                                                <input disabled={done} name={questions.currentQuestion.questions.description} id={option} type="radio" onClick={handleClickRadio}/>
                                                                <span className="black-text">{option}</span>
                                                            </label>
                                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                             }

                    {
                        timeOutBeforeStart < 11 && timeOutBeforeStart > 0 && <h4 className="center-align" >Quiz will start in {timeOutBeforeStart} </h4> 
                    }

                    {
                        (points === 0 || points )  && !place && <h4 className="center-align">You earned {points} points . Wait untill other will finish or time will run out to see your place</h4>
                    }

                    {
                        (points === 0 || points ) && place && <h4 className="center-align" >  You earned {points} points . Place - {place} </h4>
                    }

                    {started && questions && !done && 
                        <div className="center-align">
                            <button className="btn waves-effect green lighten-2" onClick={handleAnwser} >Anwser</button>
                        </div>
                    }

                    {done && !(points >= 0) && 
                        <div className="center-align">
                            <button className="btn waves-effect green lighten-2" onClick={handleSubmitQuiz}  >Finish and submit</button>
                        </div>
                    }

                    </div>
                </div>
            </div>
        </div>
    )
}