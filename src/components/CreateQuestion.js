import {useState , useContext} from 'react'
import {useMessage} from '../hooks/message.hook'
import { AnwserOptions } from '../components/AnwserOptions'
import {AuthContext} from '../context/authContext';
import {axios} from '../axios'

export const CreateQuestion = ({ quizId , cbCreateQuestion}) => {

    const message = useMessage();

    const auth = useContext(AuthContext)


    const [questions , setQuestions] = useState({
         anwserOptions:[] , questDesc:'' , anwserOption:''
    })

    const removeHandler = event => {
  
        setQuestions({...questions , anwserOptions: questions.anwserOptions.filter((option) => option !== event.target.name)})
        
    }

   

    const createQuestion = async correctAnwser =>{

        console.log('hi')

        try{
            if(!correctAnwser){
                message('You forgot to pick the anwser')
                return
            }

            if(questions.anwserOptions.length < 2){
                message('At least 2 options should be provided')
                return
            }

            console.log('Correct anwser ' , correctAnwser)

            
            const alternatives = questions.anwserOptions.map((option) => {
                return {text:option, isCorrect: option === correctAnwser}
            })

            // const readyQuestion = {description:questions.questDesc , alternatives};

            const response = await axios.post(`api/quiz/${quizId}/question` ,  {description:questions.questDesc , alternatives:alternatives} , {
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }})


            cbCreateQuestion(response)
           
    
            // setQuestions({
            //     anwserOption:'',
            //     questDesc:'',
            //     anwserOptions:[]
            // })

        }catch(e){
            console.log(e)
        }
       
    }


    const questionFormChangeHandler = event =>{
        setQuestions({...questions, [event.target.name] : event.target.value})
    }

    const pressHandler = event =>{
 
        if(event.key === 'Enter'){

            if(event.target.value.length<1){
                message('Anwser can\'t be empty')
                return
            }

            if(questions.anwserOptions.length > 0){
                if(questions.anwserOptions.some((option) => option === event.target.value)){
                    message('Anwser option cannot be the same!')
                    return
                }
            }
            setQuestions({...questions , anwserOptions: questions.anwserOptions.concat([event.target.value]) , anwserOption:''})
            
        }
    }

    return(
        <div className= "col s7 offset-s2" >
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">Quiestion Title</span>
                
                <div className="input-field">
                    <input placeholder="Enter question description" id="questionDesc" type="text"  value={questions.questDesc}
                    name="questDesc"  onChange={questionFormChangeHandler} />
                </div>

                <span className="card-title">Anwser options</span>

                <div className="input-field">
                    <input placeholder="Enter anwser option" id="anwser option"  type="text" value={questions.anwserOption} 
                    name="anwserOption"  onChange={questionFormChangeHandler} onKeyPress={pressHandler} />
                </div>

                <AnwserOptions btnText={'Create'}  createQuestionHandler={createQuestion} options={questions.anwserOptions} question={questions.questDesc}  removeHandler={removeHandler} />

                                     
               

            </div>

        </div>
    </div>

    )
}