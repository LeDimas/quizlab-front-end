import { useState ,useContext , useRef , useEffect} from "react"
import {Redirect} from  'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/authContext';
import Modal from '../components/modal/Modal'
import {Loader} from '../components/Loader'
import {clearState,setQuestionEditFlag,removeQuestion } from '../redux/quizCreateSlice'
import { useDispatch , useSelector } from 'react-redux'
import { QuestionEditForm } from "./QuestionEditForm"
import { createQuiz } from '../redux/quizSlice'


export const QuestionListPreview = () => {

    const message = useMessage();
    const quizesStatus = useSelector(state => state.quiz.status)
    const errorMsg = useSelector(state=>state.quiz.error)

    useEffect(() => {
        message(errorMsg)
    }, [errorMsg, message])

    const auth = useContext(AuthContext)

    let isEditMode = useRef(false)
    const [emptyQuiz , setEmptyQuiz] = useState(false)
    const [quizCreated , setQuizCreated] = useState(false)

    const quizRedux = useSelector((state) => state.quizCreate)
    const dispatch = useDispatch()

    const editHandler = event =>{
        dispatch(setQuestionEditFlag(event.target.name))   
    }

    const deleteHandler =  event => {
        dispatch(removeQuestion(event.target.name))
            if(quizRedux.questions.length<1)
                setEmptyQuiz(true)      
    }

    const postCreateQuiz = () =>{

          const quizForm = {quizName:quizRedux.quizName , description:quizRedux.quizDesc}
          const questionForm = quizRedux.questions
          dispatch(clearState())
          dispatch(createQuiz({quizForm , questionForm}))
          setQuizCreated(true)
    }
   
   if(quizCreated) {return <Redirect to='/profile'/>}


    if(quizesStatus === 'loading'){
        return(
            <div className="col s12 m6">
                <div className="card   blue darken-2">
                    <div className="card-content white-text">
                        <Loader/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        
            <div className="col s12 m6">
                <div className="card   blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Quiz preview</span>
                                {emptyQuiz ? <p> There is no sense in empty quiz ,don't you think? </p> : <span></span> }
                            

                                {
                                    quizRedux.questions.map((question , i) => {

                                        if(question.toEdit === true)
                                            return (<QuestionEditForm key={i} question={question} />)
                                        

                                        return (
                                            <>
                                            <h6 key={i}>{question.description}</h6>
                                                <ul>
                                                    {
                                                    question.alternatives.map((option , idx)=>{
                                                        return(
                                                        <li key={option.text} style={option.isCorrect ? {fontWeight:"bold" , textDecoration:"underline"} : {textDecoration:'none'}}>{option.text}</li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            
                                                <button name={question.description} className="btn-small waves-effectteal" disabled={isEditMode.current} onClick={editHandler}>Edit</button>
                                                <Modal name={question.description} onAgree={deleteHandler} body={'Are you sure you want to remove this question?'} naming={'Warning'} btnText={'Remove'} btnStyle={{marginLeft:'5px'}} btnColor={'red lighten-1'}  />
                                            </>
                                        ) 
                                    })
                                }          

                             </div>
                                <div className="card-action">
                                    <button onClick={postCreateQuiz} 
                                    disabled={emptyQuiz}
                                    className="btn-small waves-effect  teal" >Create Quiz</button>
                                </div>
                            </div>
                </div> 
    )
}

