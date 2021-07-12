import {changeQuestionOption,applyQuestionChanges,cancelQuestionChanges,
    changeQuestionDescription } from '../redux/quizCreateSlice'
import { useDispatch , useSelector } from 'react-redux'
import {useMessage} from '../hooks/message.hook'

export const QuestionEditForm = ({question , key}) =>{

    const quizRedux = useSelector((state) => state.quizCreate)
    const dispatch = useDispatch()
    const message = useMessage();

    const applyHandler = event => {

        if(event.target.name.length < 4){
            message('Question is to short!')
            return
        }
        quizRedux.questions.forEach((ques)=>{
            if(ques.description === event.target.name)
                if(ques.alternatives.some((opt) => opt.text.length < 1)){
                    message( 'Anwser cannot be empty!')
                    return
                }
        })
        dispatch(applyQuestionChanges(event.target.name))  
        // isEditMode.current = false;   
    }

    const changeEditDescriptionHandler = event => {
        dispatch(changeQuestionDescription({name:event.target.name , value:event.target.value}))
    }

    const changeEditOptionHandler = event => {
        const {id, name , value} = event.target;
        dispatch(changeQuestionOption({id , value, description:name}))
    }

    const cancelHandler = event => {
        dispatch(cancelQuestionChanges(event.target.name))
        // isEditMode.current = false;
    }



    return(
        <div>
            <div key={key} className="row">
                <div  className="input-field col s6">
                    <input name={question.description} id="question_title" type="text" className="validate" onChange={changeEditDescriptionHandler} value={question.description}  />
                    <span htmlFor="helper-text" data-error="wrong" data-success="right" > Question Title</span>
                </div>                                    
            </div>


            {question.alternatives.map((option,idx)=>{
                return(
                        <>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input  id={`${option.id}`} name={`${question.description}`} type="text" className="validate" onChange={changeEditOptionHandler} value={option.text} />
                                    <span htmlFor="helper-text" data-error="wrong" data-success="right" >
                                        {option.isCorrect ? 'Question number' + (idx+1) + ' (correct) ' : 'Question number ' + (idx+1) } 
                                    </span>
                                </div>
                            </div>
                        </>
                            )
                                })}

            <button name={question.description} onClick={applyHandler} className="btn-small waves-effect teal " > Apply</button>
            <button name={question.description} className="btn-small waves-effect  red lighten-2" onClick={cancelHandler} style={{marginLeft:'5px'}}>Cancel</button>
        </div>
    )
}