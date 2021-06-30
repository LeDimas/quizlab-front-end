import {QuestionEditComponent} from '../components/QuestionEditComponent'

export const QuestionList = ({questions}) => {

    return(
        <div>
            {questions && questions.map((questionObj)=>{
                return(
                    <QuestionEditComponent questionObj={questionObj} />
                )
            })}
        </div>
    )
}