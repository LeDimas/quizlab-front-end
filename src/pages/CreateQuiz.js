import {useState ,  useContext} from 'react'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/authContext'
import { AnwserOptions } from '../components/AnwserOptions'
import { QuestionListPreview } from '../components/QuestionListPreview'



export const CreateQuizPage = () =>{

    const auth = useContext(AuthContext)

 
    
    const [quizForm , setQuizForm] = useState({
        quizName:'' , description:'' 
    })

    const [previewMode , setpreviewMode] = useState(false)

    const [questions , setQuestions] = useState({
        readyQuestions:[] , anwserOptions:[] , questDesc:'' , anwserOption:''
    })

    const [createQuiz , setCreateQuiz] = useState({
        created:false });

    

    

    const message = useMessage();

    

    const quizFormChangeHandler = event => {
       
        setQuizForm({...quizForm , [event.target.name] : event.target.value})
    }

    const removeHandler = event => {
  
        setQuestions({...questions , anwserOptions: questions.anwserOptions.filter((option) => option !== event.target.name)})
        
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


    const returnStateHandler = (state) => {
        setQuestions({...questions , readyQuestions:state})
    }
    


    const createHandler = async event =>{
       
            if(quizForm.quizName ==='' || quizForm.description ===''){
                message('All fields must be filled')
                event.preventDeafult();
            }
          
            setCreateQuiz({created:true});

      
    }

    const createQuestion = async correctAnwser =>{

        try{
            if(!correctAnwser){
                message('You forgot to pick the anwser')
                return
            }

            if(questions.anwserOptions.length < 2){
                message('At least 2 options should be provided')
                return
            }

            const alternatives = questions.anwserOptions.map((option) => {
                return {text:option, isCorrect: option === correctAnwser}
            })

            const readyQuestion = {description:questions.questDesc , alternatives};
    
           
    
            setQuestions({
                readyQuestions:questions.readyQuestions.concat([readyQuestion]),
                anwserOption:'',
                questDesc:'',
                anwserOptions:[]
            })

        }catch(e){
            console.log(e)
        }
       
    }

 









    return(
        <div className="row">
            


            {!createQuiz.created ? 
                        <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
                        <div className="input-field">
                            <input placeholder="Enter quiz name" id="quizName" type="text" value={quizForm.quizName} 
                            name="quizName"  onChange={quizFormChangeHandler} />
                         
                        </div>
        
                        <div className="input-field">
                            <input placeholder="Enter quiz description" id="quizDescription" type="text" value={quizForm.description} 
                            name="description"  onChange={quizFormChangeHandler} />
                        </div>
        
                        <div className="center-align">
                                    <button className="btn red darken-5" onClick={createHandler} >Create</button>
                        </div>
        
                    </div>
                 : 
                 <div>
                     <h2>{quizForm.quizName}</h2>
                     <h3>Create Question</h3>

                     
                    <div className={!previewMode ? "col s7 offset-s2" : "col s5"}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Quiestion Title</span>
                                
                                <div className="input-field">
                                    <input placeholder="Enter question description" id="questionDesc" disabled={previewMode} type="text"  value={questions.questDesc}
                                    name="questDesc"  onChange={questionFormChangeHandler} />
                                </div>

                                <span className="card-title">Anwser options</span>

                                <div className="input-field">
                                    <input placeholder="Enter anwser option" id="anwser option" disabled={previewMode} type="text" value={questions.anwserOption} 
                                    name="anwserOption"  onChange={questionFormChangeHandler} onKeyPress={pressHandler} />
                                </div>

                                <AnwserOptions createQuestionHandler={createQuestion} options={questions.anwserOptions} question={questions.questDesc} disabled={previewMode}  removeHandler={removeHandler} />

                                                     
                               

                            </div>
                                <div className="card-action">
                                { (questions.readyQuestions.length || previewMode)?
                                    <button className="btn-small waves-effect  teal" onClick={ () =>{ setpreviewMode(!previewMode)} }> { !previewMode ? 'Preview and finish' : 'Add some more questions'}</button>:
                                    <p></p>
                                } 
                            </div>
                        </div>
                    </div>

                {
                    previewMode ?
                    <QuestionListPreview quizDescription={quizForm.description} quizName={quizForm.quizName} returnStateHandler={returnStateHandler}  questions={questions.readyQuestions} />
                  
                             : 
                    <span></span>
                    
                }
                
                     
                </div>
                 
                 }

                 

    
        </div>
    )
}