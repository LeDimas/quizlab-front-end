import {useState } from 'react'
import {useMessage} from '../hooks/message.hook'
import { AnwserOptions } from '../components/AnwserOptions'
import { QuestionListPreview } from '../components/QuestionListPreview'
import { QuizNameAndDescForm } from '../components/QuizNameAndDescForm'
import { Prompt } from 'react-router-dom'
import {setCurrentQuestionDesc, addQuestionOption, setCurrentQuestionOptionText} from '../redux/quizCreateSlice'
import { useDispatch , useSelector } from 'react-redux'



export const CreateQuizPage = () =>{
    
    
    const message = useMessage();
    const dispatch = useDispatch()
    const quizRedux = useSelector((state) => state.quizCreate)
    
    const [previewMode , setpreviewMode] = useState(false)
    const [createQuiz , setCreateQuiz] = useState({created:false });

    const pressHandler = event =>{
        if(event.key === 'Enter'){
            if(event.target.value.length<1){
                message('Anwser can\'t be empty')
                return
            }
            if(quizRedux.currentQuestionOptions.length > 0){
                if(quizRedux.currentQuestionOptions.some((option) => option === event.target.value)){
                    message('Anwser option cannot be the same!')
                    return
                }
            }
            dispatch(addQuestionOption())
        }
    }

    

const toggleCreated = () => {
    setCreateQuiz({created:true})
}

const questionDescHandler = (e) => dispatch(setCurrentQuestionDesc(e.target.value))
const questionOptHandler = (e) =>  dispatch(setCurrentQuestionOptionText(e.target.value))




    return(
        <div className="row">

        <Prompt when={createQuiz.created ^ quizRedux.quizName === ''}
             message={`Are you sure you want leave page? All changes will be unsafed!`} />
            
        {!createQuiz.created ? <QuizNameAndDescForm toggleCreated={toggleCreated} /> : 

            <div>
                <h2>{quizRedux.quizName}</h2>
                <h3>Create Question</h3>

                     
                    <div className={!previewMode ? "col s7 offset-s2" : "col s5"}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Quiestion Title</span>
                                
                                <div className="input-field">
                                    <input placeholder="Enter question description" id="questionDesc" disabled={previewMode} type="text"  value={quizRedux.currentQuestionDesc}
                                    name="questDesc"  onChange={questionDescHandler} />
                                </div>

                                <span className="card-title">Anwser options</span>

                                <div className="input-field">
                                    <input placeholder="Enter anwser option" id="anwser option" disabled={previewMode} type="text" value={quizRedux.currentQuestionOptionText} 
                                    name="anwserOption"  onChange={questionOptHandler} onKeyPress={pressHandler} />
                                </div>

                                <AnwserOptions btnText={'Next Question'}  disabled={previewMode}  />

                                </div>
                                    <div className="card-action">
                                    { 
                                        ((quizRedux.questions.length || previewMode) && <button className="btn-small waves-effect  teal" onClick={ () =>{ setpreviewMode(!previewMode)} }> { !previewMode ? 'Preview and finish' : 'Add some more questions'}</button>)
                                    } 
                                </div>
                        </div>
                    </div>

                             {(previewMode &&  <QuestionListPreview />)}
                </div>
            }
        </div>
    )
}