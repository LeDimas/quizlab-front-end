import { useState ,useContext , useRef , useMemo} from "react"
import {Redirect} from  'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/authContext';
import Modal from '../components/modal/Modal'
import {Loader} from '../components/Loader'


export const QuestionListPreview = ({quizDescription , quizName, questions , returnStateHandler}) => {

    const message = useMessage();

    const auth = useContext(AuthContext)

    let isEditMode = useRef(false)

    const {loading , error, request , clearError } = useHttp();

    const [editInput , setEditInput] = useState(questions)

    const [emptyQuiz , setEmptyQuiz] = useState(false)

    const [quizCreated , setQuizCreated] = useState(false)

    

    


    const changeEditDescriptionHandler = event => {

        const newState = editInput.map((ques) => {
            if(ques.description === event.target.name){
               
                return {...ques , description : event.target.value}
            }else{
                return {...ques}
            }
        })

        console.log(newState)

        setEditInput(newState)
    }



    const changeEditOptionHandler = event => {

        
    const [option,description] = event.target.name.split('_');

    const fieldsToChange =  editInput.find((el) => el.description === description)
    const fieldsToLeave = editInput.filter((elem)=> elem.description !== description)

   
   

    const optionsToChange = fieldsToChange.alternatives.map((opt) => {
        if(opt.text === option){
            console.log(opt.text)
            console.log(option)
            return {...opt , text:event.target.value}
        }else{
            return {...opt}
        }
    })

    


    fieldsToChange.alternatives = optionsToChange;

    const myNewState = fieldsToLeave.concat([fieldsToChange])

    // console.log(myNewState)

    setEditInput(myNewState)
    }







    const applyHandler = async event => {

   
        let error ='';

        if(event.target.name.length < 4){
            message('Question is to short!')
            return
        }

        editInput.forEach((ques)=>{
            if(ques.description === event.target.name){
                if(ques.alternatives.some((opt) => opt.text.length < 1)){
                    error = 'Anwser cannot be empty!'
                }
            }
        })

        if(error !== ''){
            message(error)
            return
        }

            const edited= editInput.find((ques) => ques.description === event.target.name)
      
           
            // const data = await request(`api/quiz/${quizId}/question` , 'PUT'  ,
            // {
            //     description:event.target.name , alternatives:editedAlternatives , oldDescription:originalDescription
            // } , {
            //     Authorization: `Bearer ${auth.token}`
            // })

            // console.log(data)


            const newState = editInput.map((ques) =>{
                if(ques.description === event.target.name){
                   return {...ques , toEdit : false}
                }
                else{
                    return {...ques}
                }
            })

            returnStateHandler(newState)
    
            isEditMode.current = false;
            setEditInput(newState)

      
    }

    const deleteHandler = async event => {
        console.log(event.target.name)

       
            // const questionToDelete =  editInput.filter((question) => question.description === event.target.name)
           
            // const descr = questionToDelete[0]['description'];
            // const data = await request(`api/quiz/${quizId}/question` , 'DELETE'  ,
            // {
            //     questionDescription:descr
            // } , {
            //     Authorization: `Bearer ${auth.token}`
            // })

            // console.log(data)

            const newState = editInput.filter((question) => question.description !== event.target.name)

            setEditInput(newState)
            returnStateHandler(newState)

            if(newState.length<1){
                setEmptyQuiz(true)
            }

       

       
    }

   

    const cancelHandler = event => {

    const newState = 
        editInput.map((ques) =>{
            if(ques.description === event.target.name){
                const initialState = ques.initialState; 
             
                return {...initialState , toEdit:false  , initialQuestion:''}
            }
            else{
                return {...ques , toEdit:false , initialQuestion:''}
            }
        })

        isEditMode.current = false;
        setEditInput(newState)

    }

    const go = async() =>{

        try{

        const data = await request('api/quiz' , 'POST'  , {quizName:quizName , description:quizDescription} , {
                Authorization: `Bearer ${auth.token}`
            })
        
        const quizId = data._id;

        //vpadlu 
        for await (const data of editInput.map(
            question => request(`api/quiz/${quizId}/question` , 'POST' , {...question} , {Authorization: `Bearer ${auth.token}`}))) {
                console.log(data)
          }

          setQuizCreated(true)

        }catch(e){
            message(e)
        }
    }
   

    const editHandler = event =>{

       const newState = editInput.map((ques) =>{
                if(ques.description === event.target.name){
                   return {...ques , toEdit : true , initialQuestion : `${ques.description}` , initialState:ques}
                }
                else{
                    return {...ques , toEdit:false}
                }
            })
        
        console.log(newState)
        isEditMode.current = true;
        setEditInput(newState)   
   }

   if(quizCreated) {return <Redirect to='/profile'/>}


    if(loading){
        return(
            <div className="col s12 m6">
                <div className="card   blue darken-2">
                    <div className="card-content white-text">
                        <Loader/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        
            <div className="col s12 m6">

                   
                        <div className="card   blue darken-2">
                            <div className="card-content white-text">

                            

                                <span className="card-title">Quiz preview</span>

                                {emptyQuiz ? <p> There is no sense in empty quiz ,don't you think? </p> : <span></span> }
                            

                                {
                                    editInput.map((question , i) => {
                                        if(question.toEdit === true){
                                            
                                           

                                            return (
                                                <div >
                                                    <div key={i} className="row">
                                                        <div  className="input-field col s6">
                                                        <input name={question.description} id="question_title" type="text" className="validate" onChange={changeEditDescriptionHandler} value={question.description}  />
        
                                                        <span htmlFor="helper-text" data-error="wrong" data-success="right" > Question Title</span>
                                                        </div>
                                                       
                                                    </div>


                                                    {
                                                        question.alternatives.map((option,idx)=>{
                                                            return(
                                                                <>
                                                                <div className="row">
                                                                    <div className="input-field col s6">
                                                                    <input  name={`${option.text}_${question.description}`} type="text" className="validate" onChange={changeEditOptionHandler} value={option.text} />
                                                                    
                                                                    <span htmlFor="helper-text" data-error="wrong" data-success="right" >
                                                                        {option.isCorrect ? 'Question number' + (idx+1) + ' (correct) ' : 'Question number ' + (idx+1) } </span>
                                                                    </div>
                                                                </div>
                                                                    
                                                                    
                                                                </>
                                                            )
                                                        })
                                                    }

                                            <button name={question.description} onClick={applyHandler} className="btn-small waves-effect teal " > Apply</button>
                                            <button name={question.description} className="btn-small waves-effect  red lighten-2" onClick={cancelHandler} style={{marginLeft:'5px'}}>Cancel</button>
                                                </div>
                                            )
                                        }

                                        return (
                                        <>
                                        <h6 key={i}>{question.description}</h6>
                                            <ul>
                                                {
                                                question.alternatives.map((option , idx)=>{
                                                    return(
                                                      <li key={option.text} style={option.isCorrect ? {fontWeight:"bold" , textDecoration:"underline"} : {textDecoration:'none'}}>{option.text}</li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        
                                            <button name={question.description} className="btn-small waves-effectteal" disabled={isEditMode.current} onClick={editHandler}>Edit</button>
                                            <Modal name={question.description} onAgree={deleteHandler} body={'Are you sure you want to remove this question?'} naming={'Warning'} btnText={'Remove'} btnStyle={{marginLeft:'5px'}} btnColor={'red lighten-1'}  />
                                            {/* <a className="waves-effect waves-light btn modal-trigger" href="#modal" disabled={isEditMode.current} style={{marginLeft:'5px'}}>Delete</a> */}
              
                                        </>
                                        
                                        ) 
                                       
                                    })
                                }

                                

                               

                        </div>
                                
                                <div className="card-action">
                                <button onClick={go} 
                                // disabled={emptyQuiz}
                                 className="btn-small waves-effect  teal" >Create Quiz</button>
                            
                            </div>
                        </div>
                    </div> 
    )
}