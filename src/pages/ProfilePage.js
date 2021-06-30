
import {useCallback, useContext, useEffect, useState} from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/authContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {QuizList} from '../components/QuizList'

export const ProfilePage = () =>{
  const {token} = useContext(AuthContext)
  const {request , loading , error , clearError} = useHttp()
  const [quizList , setQuizList] = useState(null)
  const message = useMessage()


  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const cbRemoveQuizFromQuizList = (quizName) =>{
    console.log(quizList)
    const newState = quizList.filter((name) => name !== quizName)
    if(newState.length>1){
        setQuizList(newState)
    }
        setQuizList(null)
    message('Quiz deleted!')
}
  
  const getQuizList = useCallback( async() => {
      try {
        
         const fetched =  await request(`/api/myQuizList` , 'GET' ,null ,{Authorization: `Bearer ${token}`})
         setQuizList(fetched)
      } catch (error) {}
  } , [token])

  useEffect(() =>{
      getQuizList()
      
  },[getQuizList])

  if(loading){
      return <Loader/>
  }

  const test = () =>{
      setQuizList(null)
  }
    
    return(
        <div>
            <h2>
                Profile Page
            </h2>
            <button onClick={test}>test</button>
            <div className="row">
                <div className="col s10 m4">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Card Title</span>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    </div>

                    <div className="card-content white-text">
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                    </div>

                    
                    <div className="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                    </div>
                </div>
                </div>

                

                <QuizList cbRemoveQuiz={cbRemoveQuizFromQuizList} quizes={quizList} />





            </div>
           
       

            
        </div>
    )
}