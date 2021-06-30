import {useState , useEffect} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import {Link , useHistory} from 'react-router-dom'

export const RegisterPage = () =>{

    let history = useHistory();
    const message = useMessage();
    const {loading , error, request , clearError} = useHttp();

    const styles = {
        button:{
            marginTop:'5px',
            marginBottom:'5px'
        }
    }

    const [form,setForm] = useState({
        email:"" , password:"" , username:""
    })

    useEffect(() =>{
        message(error)
        clearError()
    } , [error , message , clearError])

    const changeHandler = event => {
        setForm({...form , [event.target.name] : event.target.value})
    }
    
    const registerHandler = async() => {
        try{
             await request('/api/auth/registration' , 'POST' , {...form})
            history.push('/')
        }catch(e){
          
        }
    } 

    return(
        <div>
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>
                    Registration page
                </h1>
                
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text offset-s3">
                    <span className="card-title"> Registration page</span>

                        <div className="input-field ">
                            <input  id="email" type="text" className="validate" name="email"
                                onChange={changeHandler} value={form.email}/>
                                <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field ">
                            <input  id="username" type="text" className="validate" name="username"
                                onChange={changeHandler} value={form.username}/>
                                <label htmlFor="username">Username</label>
                        </div>

                        <div className="input-field ">
                            <input  id="password" type="password" className="validate" name="password"
                                onChange={changeHandler} value={form.password}/>
                                <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-field ">
                            <input  id="passwordConfirm" type="password" className="validate" name="passwordConfirm"
                                onChange={changeHandler}/>
                                <label htmlFor="passwordConfirm">Confirm password</label>
                        </div>

                    </div>
              
                        <div className="center-align">
                            <button className="btn red darken-5" style={styles.button} 
                                onClick={registerHandler} disabled={loading}> Register</button>
                        </div>

                        <div className="center-align">
                            Already registered? <Link to="/"> Sign in! </Link>
                        
                        </div>
                        <br/>
                       
               
                </div>
            </div>
        </div>
           
        </div>
    )
}