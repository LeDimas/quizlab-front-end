import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const ForgotPasswordPage = () => {
    
    const [email , setEmail] = useState('')
    const [emailSent , setEmailSent] = useState(false)
    const inputChangeHandler = e => setEmail(e.target.value)
    const resetHandler = async() =>{
        setEmailSent(true)
        try{
            await axios.post('http://localhost:5000/api/auth/passwordReset' , {email})
        }catch(e){
            console.log(e)
        }
    }


    return(
        <div>
                <div className="row">
                <div className="col s8 offset-s2">
                    <h1>
                        Password Recovery
                    </h1>
                    
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text offset-s3">
                        <span className="card-title">
                            {!emailSent ? 'Enter your email to which you will recieve password reset link'
                             : 'Password recovery link was sent to your email . Follow the email instructions to refresh your password'}</span>


                            {!emailSent && 
                            <div className="input-field ">
                                    <input  id="email" type="text" className="validate" name="email"
                                    value={email} onChange={inputChangeHandler}/>
                                <label htmlFor="email">email</label>
                            </div>
                            }
                            

                        </div>
                            {
                                !emailSent && 
                            <div className="center-align">
                                <button className="btn red darken-5"
                                //  disabled={loading}
                                onClick={resetHandler} >Send Password Reset Link</button>
                            </div>
                            }
                          

                            <div className="center-align">
                                     <Link to="/"> Back to authorization page </Link>
                            </div>
                            <br/>
                        
                
                    </div>
                </div>
            </div>
        </div> 
        );
}
 
export default ForgotPasswordPage;
