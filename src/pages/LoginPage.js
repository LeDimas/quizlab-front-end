import { useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import { useDispatch , useSelector } from 'react-redux'
import { login } from '../redux/userSlice'

export const LoginPage = () =>{

    const userState = useSelector((state)=> state.user)
    const error = userState.error
    const dispatch = useDispatch()
    const message = useMessage();

    const styles = {
        button:{
            marginTop:'10px',
            marginBottom:'5px'
        }
    }

    useEffect(()=>{
        message(error)
    } ,[ message , error])

   



    const [form,setForm] = useState({
        email:"" , password:""
    })

    const changeHandler = event => {
        setForm({...form , [event.target.name] : event.target.value})
    }
    
    const loginHandler = () => {
        try{
            dispatch(login({password:form.password , email:form.email}))
        }catch(e){
            console.log(e)
        }
    } 

    return(
        <div>
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>
                    Registration
                </h1>
                
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text offset-s3">
                    <span className="card-title">Authorization</span>

                        <div className="input-field ">
                            <input  id="email" type="text" className="validate" name="email"
                               value={form.email} onChange={changeHandler}/>
                                <label htmlFor="email">email</label>
                        </div>

                        <div className="input-field ">
                            <input  id="password" type="password" className="validate" name="password"
                                value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                        </div>

                    </div>
              
                        <div className="center-align">
                            <button className="btn red darken-5" style={styles.button}
                            //  disabled={loading}
                            onClick={loginHandler} >Login</button>
                        </div>

                        <div className="center-align">
                            Not registered? <Link to="/register"> Sign up! </Link>
                            <p><Link to="/forgotPassword">Forgot Password?</Link> </p>
                        </div>
                        <br/>
                       
               
                </div>
            </div>
        </div>
           
        </div>
    )
}