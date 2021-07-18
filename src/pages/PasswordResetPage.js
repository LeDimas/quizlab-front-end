import {useState} from 'react'
import { useParams ,Link } from 'react-router-dom'
import axios from 'axios'

const PasswordResetPage = () => {

    const userId  = useParams().userId
    const token = useParams().token
    const [password , setPassword] = useState({password:'' , passwordValidation:'' , reseted:false})
    const inputChangeHandler = e => setPassword({...password , [e.target.name]:e.target.value})

    const resetHandler = async() =>{
        setPassword({...password , reseted:true})
        try{
            await axios.post(`http://localhost:5000/api/auth/passwordReset/${userId}/${token}` , {password:password.password})
        }catch(e){
            console.log(e)
        }
    }    

    return ( 
        <div>
             <div className="row">
                <div className="col s8 offset-s2">
                    <h1>
                        Password Reset
                    </h1>
                    
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text offset-s3">
                        <span className="card-title">
                        {!password.reseted ? 'Enter new password'
                             : 'Password is changed , you can follow link below to sing in'}
                        </span>


                           
                            <div className="input-field ">
                                    <input  id="password" type="text" className="validate" name="password"
                                    value={password.password} onChange={inputChangeHandler}/>
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="input-field ">
                                    <input  id="passwordValidation" type="text" className="validate" name="passwordValidation"
                                    value={password.passwordValidation} onChange={inputChangeHandler}/>
                                <label htmlFor="passwordValidation">Password confirm</label>
                            </div>
                            
                            

                        </div>
                         
                            <div className="center-align">
                                <button className="btn red darken-5"
                                //  disabled={loading}
                                onClick={resetHandler} >Reset Password</button>
                            </div>
                            
                          

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
 
export default PasswordResetPage;