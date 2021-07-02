import {useState , useCallback , useContext , useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/authContext'
import {Loader} from '../components/Loader'
import {useParams} from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {QuestionList} from '../components/QuestionList'
import {axios} from '../axios'
import {CreateQuestion} from '../components/CreateQuestion'
import {Link ,Redirect} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'



export const QuizEnterRoomPage = () =>{

    const message = useMessage()
    const {token , userName} = useContext(AuthContext)
    const {request , loading} = useHttp()
    const [invitationCode , setInvitationCode] = useState('')
    const [game , setGame] = useState(null)
    const [fetchedResult , setFetchedResult] = useState(null)
    const gameLink = useParams().gameLink

    const getQuiz = useCallback(async () => {
        try{

           const fetchedGame =  await request(`/api/game/joinGame/${gameLink}` , 'GET' , null ,{
                Authorization: `Bearer ${token}`
            })
            console.log(fetchedGame)

            setGame(fetchedGame)
        }catch(e){
            message(e)
        }
    } ,[token , gameLink , request , message])

    useEffect(()=>{
        getQuiz()
    },[getQuiz])

    const handleEnterRoom = async () =>{
        try{

           const response =  await request(`/api/game/joinGame/${gameLink}` , 'POST' , {invitationCode:invitationCode} ,{
                Authorization: `Bearer ${token}`
            })

            console.log(response)

            setFetchedResult(response)

        }catch(e){
            message(e)
        }
    }

    const handleChange = event =>{
        setInvitationCode(event.target.value)
    }

    if(fetchedResult && fetchedResult.status === 'OK'){
        return <Redirect to={{
            pathname: `/room/${gameLink}`,
            state: { fetchedResult }
          }}/>
    } 



    if(game)
        if(game.isStarted)
        return(
            <div>
            <h1>
                Quiz Game Page
            </h1> 
            <div className="row">
                        <div className="col s12 m10 offset-m1">
                            <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="center-align card-title">Quiz "{game.quiz.name}"</span>

                                <div className="row">
                                    <div className="col s12 m10 offset-m2">
                                        <p>Oops</p>
                                        <p>Game is already started so unfortunately you can't join the party :( </p>
                                    </div>
                                </div>



                           

                    <div className="row">
                        <div className="col m6 s6 offset-m5 offset-s3" >
                            <Link to="/profile">
                                <button style={{marginTop:'30px' , width:'150px'}} className="btn-small waves-effect  blue darken-1" > Back to Profile </button> 
                            </Link>
                        </div>

                    </div>
                    
                            </div>


                      
                            </div>
                        </div>
                        </div>
                        </div>    
        )


    if(game)
     if(!game.isStarted)
        return(
            <div>
            <h1>
                Quiz Game Page
            </h1>         
                       
                        <div className="row">
                        <div className="col s12 m10 offset-m1">
                            <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="center-align card-title">Quiz "{game.quiz.name}"</span>

                                <div className="row">
                                    <div className="col s12 m3 offset-m2 card green darken-3">
                                        <p>Quiz description:</p>
                                        <p>{game.quiz.description}</p>
                                    </div>
                                </div>



                                <div className="row">
                                    <div style={{marginLeft:'150px' , minWidth:'500px'}} className="input-field col s6">
                                        <input name="invitation_code" onChange={handleChange} value={invitationCode} placeholder="Invitation code" id="invitation_code" type="text" className="validate"/>
                                        <span className="helper-text">Invitation code</span>
                                    </div>
                                </div>

                    <div className="row">
                        <div className="col m6 s6 offset-m4 offset-s3" >
                            <button onClick={handleEnterRoom} style={{marginTop:'30px'}} className="btn-small waves-effect  green darken-1" > Enter room </button> 
                            <Link to="/profile">
                                <button style={{marginTop:'30px' , width:'150px' ,  marginLeft:'20px'}} className="btn-small waves-effect  blue darken-1" > Back to Profile </button> 
                            </Link>
                        </div>

                    </div>
                    
                            </div>


                      
                            </div>
                        </div>
                        </div>
                        </div>
        )


    return(
        <div>
            <h1>
                Quiz Game Page
            </h1>
            {(!game && loading) && <Loader/>}
        </div>
    )
}