import { useEffect, useRef, useState , useCallback } from 'react'
import {useLocalStorage} from '../hooks/localStorage.hook'
import {useBeforeUnload} from '../hooks/beforeUnload.hook'
import {useMessage} from '../hooks/message.hook'

import io from 'socket.io-client'


const SERVER_URL = 'http://localhost:5000'


export const useSocket = ({roomId , quizName , durationInMinutes , timeOutCb}) => {

  const message = useMessage()
  
  const [players, setPlayers] = useState([])
  
  const [questions, setQuestions] = useState(null)

  const [submited , setSubmited] = useState(false)

  const [started , setStarted] = useState(false)

  const [points , setPoints] = useState(null)

  const [place , setPlace] = useState(null)


  const [userId] = useLocalStorage('userId')

  const [username] = useLocalStorage('userName')


 

  

  



  const startTimerTimeRef = useRef(null)
  const socketRef = useRef(null)
  const currentQuestionRef = useRef(0)

  const setCountDown = () =>{
    setTimeout(()=>{console.log('Time Out!')} , 20000)
  }

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })
 
    socketRef.current.emit('joinQuizRoom', { usernameId:userId , roomId , username})

    socketRef.current.on('notifyOthersAboutNewConnectedPlayer' , (name)=>{
    
      message(`${name} has joined game`);

      
      const newState = players.concat(name)
      console.log('One joined' , newState)

      setPlayers(newState)
      
  });

    socketRef.current.on('retrieveOtherPlayers', (otherPlayers) => {

      console.log(otherPlayers)

      if(!otherPlayers.length<1){
        console.log('Other',otherPlayers)
        const newState = players.concat(otherPlayers)
        console.log(newState)
        setPlayers(newState)
      }
      
    })

    socketRef.current.on('begin countdown' , () => 
      {
        socketRef.current.emit('request questions' , {roomId,quizName})
    })

   

    socketRef.current.on('question supply' , (suppliedQuestions)=>{
      setQuestions({suppliedQuestions , currentQuestion:suppliedQuestions[currentQuestionRef.current]})
      setStarted(true)
      // setCountdownTimer()
      setCountDown()
      startTimer()
    })

    socketRef.current.on('quiz points' , (correctAnwsered) =>{
      setPoints(correctAnwsered)
    })

    socketRef.current.on('returnPlace' , (place) =>{
     console.log('Your place is ', place)
     setPlace(place)
    })

    

    socketRef.current.on('result' , ()=>{
      console.log('RESULT' )
      socketRef.current.emit('getPlace' , {username})
      
    })

    socketRef.current.on('participant disqualifed' , (msg) =>{
      message('In further fixes you will be considered as leaver and won\' be accessed to this quiz')
    })

   
    

    return () => {
   
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  const getNextQuestion = () =>{

    currentQuestionRef.current = currentQuestionRef.current+1

    if(currentQuestionRef.current >= questions.suppliedQuestions.length)
      return

    setQuestions({...questions , currentQuestion:questions.suppliedQuestions[currentQuestionRef.current]})

  }
  
  const startGame = () => {
    socketRef.current.emit('admin pressed countdown', {roomId})
  }


  const submitQuiz = (anwsers) =>{
    const timeResultInSec = endTimer()
    console.log('Time result' ,timeResultInSec )
    const validAnwserObj = {anwsers:anwsers}

    socketRef.current.emit('player submit',
       {userAnwsers:validAnwserObj , usernameId:userId.userId , roomId , quizName , timeResult:timeResultInSec })
    setSubmited(true)

  }



  const startTimer = () => {
    startTimerTimeRef.current = new Date();
  }
  

  const endTimer = () =>{
    const endTime = new Date();
    let timeDiff = endTime - startTimerTimeRef.current; //in ms
    // strip the ms
    timeDiff /= 1000;
    // get seconds 
    let seconds = Math.round(timeDiff);
    console.log('Time result in seconds' ,seconds);
    return seconds;
  }


  return { players , startGame ,questions , submited , started , getNextQuestion , submitQuiz , points  , place }
}