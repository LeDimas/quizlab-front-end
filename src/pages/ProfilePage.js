
import { useContext, useEffect, useState} from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/authContext'

import { useMessage } from '../hooks/message.hook'
import {QuizList} from '../components/QuizList'
import {useDispatch , useSelector} from 'react-redux'
import { selectAllData, fetchQuizes } from '../redux/quizSlice'



export const ProfilePage = () =>{
  const {token} = useContext(AuthContext)
  const message = useMessage()


  const dispatch = useDispatch()

  const quizes = useSelector(selectAllData)
  const quizesStatus = useSelector(state => state.quiz.status)
  const errorMsg = useSelector(state=>state.quiz.error)

  useEffect(() => {
      if(quizesStatus === 'idle'){
          dispatch(fetchQuizes())
      }
  } , [quizesStatus ,dispatch ])




  useEffect(() => {
    message(errorMsg)
  }, [errorMsg, message])

  const test = () =>{
    console.log(quizes)
}



if (quizesStatus === 'succeeded'){
    console.log('quiz status' , quizesStatus)
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
                    </div>
                </div>
                <QuizList />
            </div>        
        </div>
    )
  }


  if(quizesStatus === 'idle' || 'loading') { return <Loader/>}

}