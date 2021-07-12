import {useState , useEffect} from 'react'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/authContext'
import {MyDialog} from '../components/Dialog'
import { useDispatch , useSelector } from 'react-redux';
import { setQuestionEditFlag , changeQuestionDescription , removeQuestionAsync ,
     selectQuestionByDesc , cancelQuestionChanges , changeQuestionOption , updateQuestionAsync } from '../redux/quizCreateSlice'


export const QuestionEditComponent = ({match}) =>{

    // const {token} = useContext(AuthContext)

    const question = useSelector(state => selectQuestionByDesc(state , match))
    const quizId = useSelector(state => state.quizCreate.quizId)
    const errorMsg = useSelector(state => state.quizCreate.error)
    const dispatch = useDispatch()
    
    const message = useMessage()

    useEffect(() => {
      message(errorMsg)
    }, [errorMsg, message])

    const [dialogOpen , setDialogOpen] = useState(false)

    const handleOpenDeleteDialog = ()=>{
        setDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDialogOpen(false);
    }
    
    const handleDeleteQuestion = () =>{
        setDialogOpen(false);
        dispatch(removeQuestionAsync({quizId , description: question.description}))
    }

    const handleEditOn = () =>{
       dispatch(setQuestionEditFlag(question.description))
    }

    const handleEditOff = () =>{
        dispatch(cancelQuestionChanges(question.description))
    }

    const handleChangeInputField = event =>{
        dispatch(changeQuestionOption({description:question.description , id:event.target.id , value:event.target.value}))
    }

    const handleDescriptionChange = event =>{
        dispatch(changeQuestionDescription({value:event.target.value , name:question.description}))
    }

    const handleApply = () =>{
        if(question.description.length < 4){
            message('Question is to short!')
            return
        }
        if(question.alternatives.some((option) => option.text.length < 1)){
          message( 'Anwser cannot be empty!')
          return
       }      
       const payload = {description: question.description , oldDescription: question.initialQuestion , alternatives:question.alternatives}
           
       dispatch(updateQuestionAsync({payload , quizId})) 
    }
   

    if(question.toEdit){
        return(
            <div
             key={question._id}
              className="row">

                <div className="input-field col s6 row">
                    <input  name='description' type="text"
                     onChange={handleDescriptionChange} 
                     className="validate"  value={question.description} />
                </div>
                       
                        <div>
                            {question.alternatives.map((option) => {
                                return(
                                    <div className="row">
                                        <div className="input-field col s5">
                                        <input id={option._id}  name={question.description} placeholder="Type your question option"  type="text" onChange={handleChangeInputField} className="validate" value={option.text}/>                                      
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button style={{marginTop:'10px'}} onClick={handleApply} className="btn-small waves-effect  green darken-1" > Apply </button>
                        <button style={{marginTop:'10px' , marginLeft:'15px'}} name={question.description}
                        onClick={handleEditOff} 
                        className="btn-small waves-effect  red darken-1" > Cancel </button>  

                     
            </div>
        )
    }

                                                         
    if(!question.toEdit)
    return(
  
        <div key={question}>
                        <h5 style={{marginTop:'15px'}}>{question.description}</h5>
                        <div>
                            {question.alternatives.map((option ,i) => {
                                return(
                                    <div key={i}>

                                        <label >
                                            <input name={question.description} checked={option.isCorrect} readOnly={true}  type="radio"  />
                                            <span className="dark-text">{option.text} </span>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>

                        <button name={question.description} style={{marginTop:'10px'}} onClick={handleEditOn} className="btn-small waves-effect  green darken-1" > Edit </button>
                        <button onClick={handleOpenDeleteDialog} style={{marginTop:'10px' , marginLeft:'15px'}} className="btn-small waves-effect  red darken-1" > Delete </button>  
                        
                        <MyDialog  dialogOpen={dialogOpen} onAgree={handleDeleteQuestion} title={'Warning'}
                         body={'Are you sure you want to delete this quiz? It will remove quiz permamently'}
                         handleCloseDialog={handleCloseDeleteDialog} />
                
            </div>
    )
}