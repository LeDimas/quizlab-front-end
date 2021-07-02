import {useState , useEffect} from 'react'
import {useMessage} from '../hooks/message.hook'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { AuthContext } from '../context/authContext'
import { useHttp } from '../hooks/http.hook'


export const QuestionEditComponent = ({questionObj , cbDeleteQuestion , cbUpdateQuestion}) =>{

    // const {token} = useContext(AuthContext)
    const {request , loading , error , clearError} = useHttp()
    
    const message = useMessage()

    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    const [question , setQuestion] = useState({
        description:questionObj.description , options:questionObj.alternatives , toEdit:false 
    })

    const [dialogOpen , setDialogOpen] = useState(false)

    const handleOpenDeleteDialog = ()=>{
        setDialogOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDialogOpen(false);
    };
    
    const handleDeleteQuestion = async () =>{

        try{
         
            setDialogOpen(false);
            cbDeleteQuestion(questionObj)

     



        }catch(e){
            console.log(e)
        }
               
            
    }


    console.log(question)
 

    const handleEditOn = () =>{
       setQuestion({...question , toEdit:true  })
    }

    const handleEditOff = () =>{
        //IF EMPTY
        setQuestion({description:questionObj.description , options:questionObj.alternatives , toEdit:false})
    }

    const handleChangeInputField = event =>{

      

        const changedOptionArray = question.options.map((option) => {
            if(option.text === event.target.name){
                
                // const myObj = {description:question.description , toEdit:true , }
            
                return {...option , text:event.target.value}
            }else{
                return {...option}
            }
        })        

        const newState = {...question , options:changedOptionArray}
        // console.log('New state',newState)
        setQuestion(newState)
    }


    const handleDescriptionChange = async (event) =>{
        setQuestion({...question , description:event.target.value})
    }

    const handleApply = async () =>{

        let error ='';
        

        if(question.description.length < 4){
            message('Question is to short!')
            return
        }

      if(question.options.some((option) => option.text.length < 1)){
          error = 'Anwser cannot be empty!'
      }

        if(error !== ''){
            message(error)
            return
        }
        console.log('requesting')
        
        const updateData = {description:question.description , alternatives:question.options , oldDescription:questionObj.description}
        
        cbUpdateQuestion(updateData , questionObj.quiz)
      
        setQuestion({...question, toEdit:false})





    }
   



    if(question.toEdit){
        return(
            <div key={questionObj._id} className="row">
                <div className="input-field col s6 row">
                    <input  name='description' type="text" onChange={handleDescriptionChange} className="validate"  value={question.description} />
                </div>
                       
                        <div>
                            {question.options.map((option) => {
                                return(
                                    <div className="row">


                                        <div className="input-field col s5">
                                        <input name={option.text} placeholder="Placeholder" id="first_name" type="text" onChange={handleChangeInputField} class="validate" value={option.text}/>
                                       
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button style={{marginTop:'10px'}} onClick={handleApply} className="btn-small waves-effect  green darken-1" > Apply </button>
                        <button style={{marginTop:'10px' , marginLeft:'15px'}} onClick={handleEditOff} className="btn-small waves-effect  red darken-1" > Cancel </button>  

                     
            </div>
        )
    }

    
                                                                   
                                                                    
                                                              
    if(!question.toEdit)
    return(
  
        <div key={question}>
                        <h5 style={{marginTop:'15px'}}>{question.description}</h5>
                        <div>
                            {question.options.map((option ,i) => {
                                return(
                                    <div key={i}>

                                        <label >
                                            <input name={question.description} checked={option.isCorrect}  type="radio"  />
                                            <span className="dark-text">{option.text} </span>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>

                        <button name={question.description} style={{marginTop:'10px'}} onClick={handleEditOn} className="btn-small waves-effect  green darken-1" > Edit </button>
                        <button onClick={handleOpenDeleteDialog} style={{marginTop:'10px' , marginLeft:'15px'}} className="btn-small waves-effect  red darken-1" > Delete </button>  
                        
                        <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Wanring"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this quiz? It will remove quiz permamently
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <button className="btn-small waves-effect  red darken-1" onClick={handleCloseDeleteDialog} color="primary">
                            Cancel
                        </button>
                        <button className="btn-small waves-effect  green darken-1" onClick={handleDeleteQuestion} color="primary" autoFocus>
                            Agree
                        </button>
                        </DialogActions>
                    </Dialog>
            </div>
    )
}