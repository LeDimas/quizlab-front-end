import {QuestionEditComponent} from '../components/QuestionEditComponent'
import { useSelector  } from 'react-redux'


export const QuestionList = () => {

    const questions = useSelector(state => state.quizCreate.questions)

    return(
        <div>
            {questions && questions.map((question)=>{
                return(
                    <QuestionEditComponent  match={question.description} />
                )
            })}
        </div>
    )
}