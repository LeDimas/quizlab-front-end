import {useState } from 'react';
import {useMessage} from '../hooks/message.hook'
import { useDispatch , useSelector } from 'react-redux'
import { removeQuestionOption , addQuestion , createQuestionAsync , clearQuestionForm } from '../redux/quizCreateSlice'

export const AnwserOptions = ({ disabled , btnText , createAsync = false }) =>{

    const message = useMessage()
    const quizRedux = useSelector((state) => state.quizCreate)
    const dispatch = useDispatch()
    
    const [correctAnwser , setCorrectAnwser] = useState('');
    
    const createQuestionButtonHandler = () => {
            if(correctAnwser === ''){
                message('You forgot to pick the anwser')
                return
            }

            if(quizRedux.currentQuestionOptions.length < 2){
                message('At least 2 options should be provided')
                return
            }

            if(quizRedux.currentQuestionDesc.length < 4){
                message('Question length can\'t be less than 4 symbols')
                return
            }

            if(!createAsync)
                dispatch(addQuestion(correctAnwser))
            else
               {
                    dispatch(createQuestionAsync({quizId:quizRedux.quizId , description:quizRedux.currentQuestionDesc ,
                        correctAnwser , options:quizRedux.currentQuestionOptions}))
                    dispatch(clearQuestionForm())   
                }

                
           setCorrectAnwser('')
    }

const removeHandler = e =>  dispatch(removeQuestionOption(e.target.name))
    
  if(quizRedux.currentQuestionOptions.length>0){ 
    return(<ul> {quizRedux.currentQuestionOptions.map((option , i) =>   
            <li key={i}>
                <div className="row valign-wrapper   ">
                    <div className="col s7" style={{marginTop:'10px'}}>
                        <label >
                            <input name='isCorrect' id={option} type="radio" onClick={(event) => { setCorrectAnwser(event.target.id)}} />
                            <span className="white-text">{option}</span>
                        
                        </label>

                    </div>

                    <div className="right-align col s4" style={{marginTop:'10px'}}>
                        <button className="btn-small waves-effect red lighten-2" name={option} onClick={removeHandler} >Remove </button>
                    </div>

                </div>
             </li> 
          
     
        )}
        <button className="btn-small waves-effect  green darken-1" disabled={disabled} onClick={createQuestionButtonHandler} > {btnText} </button>
    </ul>
    )
}

return <p>Create a question</p>
}