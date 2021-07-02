import {useState } from 'react';

export const AnwserOptions = ({options , question , removeHandler , disabled , btnText , createQuestionHandler ,}) =>{

    
    
    const [correctAnwser , setCorrectAnwser] = useState('');
    
    const createQuestionButtonHandler = () => {
        createQuestionHandler (correctAnwser);
    }
    

  if(options){ 
    return(<ul> {options.map((option , i) => 

            
            
            <li key={i}>
                <div className="row valign-wrapper   ">
                    <div className="col s7" style={{marginTop:'10px'}}>
                        <label >
                            <input name='isCorrect' id={option} type="radio" onClick={(event) => { setCorrectAnwser(event.target.id)}} />
                            <span className="white-text">{option}</span>
                        
                        </label>

                    </div>

                    <div className="right-align col s4" style={{marginTop:'10px'}}>
                        <button className="btn-small waves-effect red lighten-2" name={option} onClick={removeHandler} >Remove </button>
                    </div>

                </div>
             </li> 
          
     
        )}
        <button className="btn-small waves-effect  green darken-1" disabled={disabled} onClick={createQuestionButtonHandler} > {btnText} </button>
    </ul>
    )
}

return <p>Create a question</p>
}