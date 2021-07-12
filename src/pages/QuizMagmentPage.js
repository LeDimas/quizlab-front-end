import {useState  , useContext , useEffect} from 'react'
import {AuthContext} from '../context/authContext'
import {Loader} from '../components/Loader'
import {useParams} from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {QuestionList} from '../components/QuestionList'

import {CreateQuestion} from '../components/CreateQuestion'
import {Link} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { fetchQuiz } from '../redux/quizCreateSlice'
import { useMessage } from '../hooks/message.hook'




export const QuizManagmentPage = () =>{
    const {token} = useContext(AuthContext)
    const quizId = useParams().quizId
    const [createNew , setCreateNew] = useState(false)


    const message = useMessage()
    const dispatch = useDispatch()
    const quizStatus = useSelector(state => state.quizCreate.status)
    const quiz = useSelector(state => state.quizCreate)
    const errorMsg = useSelector(state=>state.quizCreate.error)
  
    useEffect(() => {
        if(quizStatus === 'idle')
            dispatch(fetchQuiz(quizId))
    } , [quizStatus ,dispatch ])

    useEffect(() => {
        message(errorMsg)
      }, [errorMsg, message])


    if(quizStatus === 'idle' || quizStatus !== 'succeeded'){
        return <Loader/>
    }

    if(quizStatus === 'failed')
      {  return(<h3>Something went wrong on server</h3>) }


    return(
        <div className="row">
            <h2>
                Quiz Managment Page
            </h2>
           
           
            {quizStatus === 'succeeded'  && 


                <div className="col s12 m4">
                    <div className="card blue-grey lighten-2">
                        <div className="card-content black-text">
                            <span>Quiz name</span>
                            <span className="card-title">{quiz.quizName}<IconButton style={{display:'inline-block'}} aria-label="edit"><EditIcon/></IconButton></span>   
                        </div>
                    </div>
                </div>
                }

          {quizStatus === 'succeeded' && 
              <div className="col s12 m6">
                <div className="card blue-grey lighten-2">
                    <div className="card-content black-text">
                        <span>Quiz name</span>
                        <span className="card-title">{quiz.quizDesc}<IconButton style={{display:'inline-block'}} aria-label="edit"><EditIcon/></IconButton></span>   
                    </div>
                </div>
          </div>
          }

          {quizStatus === 'succeeded' && 
            <div className="col s8 m8 offset-s2 offset-m2">
                <div className="section">
                    <h5>Questions</h5>
                </div>
                <div className="divider"/>
                <QuestionList  />
            </div>
          }

            { createNew && <CreateQuestion/> }
      
            <button style={{marginTop:'30px' , marginLeft:createNew ? '407px' : '400px'}} onClick={()=>{setCreateNew(!createNew)}}
             className="btn-small waves-effect  green darken-1" > {!createNew?'Add another question ':'Close quesiton form'}</button>  
        
               

        <Link to="/profile">
            <button style={{width:'190px',marginTop:'30px' , marginLeft:'405px'}} className="btn-small waves-effect  blue darken-1" > Back to Profile </button> 
        </Link>
        </div>
    )
}