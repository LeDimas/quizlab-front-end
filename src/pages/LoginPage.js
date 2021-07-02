import {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/authContext'

export const LoginPage = () =>{
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading , error , request , clearError } = useHttp();

    const styles = {
        button:{
            marginTop:'10px',
            marginBottom:'5px'
        }
    }

    useEffect(()=>{
        message(error)
        clearError()
    } ,[clearError , message , error])

   



    const [form,setForm] = useState({
        username:"" , password:""
    })

    const changeHandler = event => {
        setForm({...form , [event.target.name] : event.target.value})
    }
    
    const loginHandler = async() => {
        try{
            const data = await request('/api/auth/login' , 'POST' , {...form})

        
            auth.login(data.token , data.userId , data.username)
        }catch(e){

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
                            <input  id="username" type="text" className="validate" name="username"
                               value={form.username} onChange={changeHandler}/>
                                <label htmlFor="username">Username</label>
                        </div>

                        <div className="input-field ">
                            <input  id="password" type="password" className="validate" name="password"
                                value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                        </div>

                    </div>
              
                        <div className="center-align">
                            <button className="btn red darken-5" style={styles.button} disabled={loading}
                            onClick={loginHandler} >Login</button>
                        </div>

                        <div className="center-align">
                            Not registered? <Link to="/register"> Sign up! </Link>
                        
                        </div>
                        <br/>
                       
               
                </div>
            </div>
        </div>
           
        </div>
    )
}