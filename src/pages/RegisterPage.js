import {useState , useEffect} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import {Link , useHistory} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { registration } from '../redux/userSlice'

export const RegisterPage = () =>{

    const dispatch = useDispatch()
    const error = useSelector((state)=>state.user.error)

    let history = useHistory();
    const message = useMessage();

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
    } , [error , message ])

    const changeHandler = event => setForm({...form , [event.target.name] : event.target.value})
    
    const registerHandler =() => 
    {
        dispatch(registration({...form}))
        if(!error) history.push('/')
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
                                onClick={registerHandler}
                                //  disabled={loading}
                                 > Register</button>
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