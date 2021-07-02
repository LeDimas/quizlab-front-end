import {QuestionEditComponent} from '../components/QuestionEditComponent'

export const QuestionList = ({questions ,cbDeleteQuestion , cbUpdateQuestion}) => {

    return(
        <div>
            {questions && questions.map((questionObj)=>{
                return(
                    <QuestionEditComponent questionObj={questionObj} cbUpdateQuestion={cbUpdateQuestion} cbDeleteQuestion={cbDeleteQuestion} />
                )
            })}
        </div>
    )
}