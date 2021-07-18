
import {useMessage} from '../hooks/message.hook'
import { AnwserOptions } from '../components/AnwserOptions'
import {setCurrentQuestionDesc, addQuestionOption, setCurrentQuestionOptionText } from '../redux/quizCreateSlice'
import { useDispatch , useSelector } from 'react-redux'


export const CreateQuestion = () => {

    const message = useMessage();

    

    const dispatch = useDispatch()
    const quizRedux = useSelector((state) => state.quizCreate)


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

const questionDescHandler = (e) => dispatch(setCurrentQuestionDesc(e.target.value))
const questionOptHandler = (e) =>  dispatch(setCurrentQuestionOptionText(e.target.value))
 

    return(
        <div className= "col s7 offset-s2" >
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">Quiestion Title</span>
                
                <div className="input-field">
                    <input placeholder="Enter question description" id="questionDesc" type="text"  value={quizRedux.currentQuestionDesc}
                    name="questDesc"  onChange={questionDescHandler} />
                </div>

                <span className="card-title">Anwser options</span>

                <div className="input-field">
                    <input placeholder="Enter anwser option" id="anwser option"  type="text" value={quizRedux.currentQuestionOptionText} 
                    name="anwserOption"  onChange={questionOptHandler} onKeyPress={pressHandler} />
                </div>

                <AnwserOptions btnText={'Create'} createAsync={true} />

            </div>

        </div>
    </div>

    )
}