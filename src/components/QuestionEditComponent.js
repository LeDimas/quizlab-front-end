import {useState} from 'react'

export const QuestionEditComponent = ({questionObj}) =>{

    const [question , setQuestion] = useState({
        description:questionObj.description , options:questionObj.alternatives , toEdit:false 
    })

    console.log(question)
 

    const handleEditOn = () =>{
       setQuestion({...question , toEdit:true  })
    }

    const handleEditOff = () =>{
        setQuestion({description:questionObj.description , options:questionObj.alternatives , toEdit:false})
    }

    const handleChangeInputField = event =>{

        console.log('Old state' , question) 

        const changedOptionArray = question.options.map((option) => {
            if(option.text === event.target.name){
                
                const myObj = {description:question.description , toEdit:true , }
            
                return {...option , text:event.target.value}
            }else{
                return {...option}
            }
        })

        

        const newState = {...question , options:changedOptionArray}
        // console.log('New state',newState)
        setQuestion(newState)
    }



   



    if(question.toEdit){
        return(
            <div key={questionObj._id} className="row">
                <div className="input-field col s6 row">
                    <input  name={question.description} type="text" className="validate"  value={question.description} />
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

                        <button style={{marginTop:'10px'}} className="btn-small waves-effect  green darken-1" > Apply </button>
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
                        <button style={{marginTop:'10px' , marginLeft:'15px'}} className="btn-small waves-effect  red darken-1" > Delete </button>  
            </div>
    )
}