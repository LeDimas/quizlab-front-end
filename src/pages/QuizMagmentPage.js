import {useState , useCallback , useContext , useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/authContext'
import {Loader} from '../components/Loader'
import {useParams} from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {QuestionList} from '../components/QuestionList'


export const QuizManagmentPage = () =>{
    const {token} = useContext(AuthContext)
    const {request , loading} = useHttp()
    const [quiz , setQuiz] = useState(null)
    const quizId = useParams().quizId

    const getQuiz = useCallback(async () => {
        try{
           const fetchedQuiz =  await request(`/api/quiz/${quizId}` , 'GET' , null ,{
                Authorization: `Bearer ${token}`
            })

            console.log(fetchedQuiz)

            setQuiz(fetchedQuiz)
        }catch(e){

        }
    } ,[token , quizId , request])

    useEffect(()=>{
        getQuiz()
    },[getQuiz])


    // todo:make forbidden view


    if(loading){
        return <Loader/>
    }



    return(
        <div className="row">
            <h2>
                Quiz Managment Page
            </h2>
           
           
            {!loading && quiz && 


                <div class="col s12 m4">
                    <div class="card blue-grey lighten-2">
                        <div class="card-content black-text">
                            <span>Quiz name</span>
                            <span class="card-title">{quiz.name}<IconButton style={{display:'inline-block'}} aria-label="edit"><EditIcon/></IconButton></span>   
                        </div>
                    </div>
                </div>
                }

          {!loading && quiz && 
              <div class="col s12 m6">
                <div class="card blue-grey lighten-2">
                    <div class="card-content black-text">
                        <span>Quiz name</span>
                        <span class="card-title">{quiz.description}<IconButton style={{display:'inline-block'}} aria-label="edit"><EditIcon/></IconButton></span>   
                    </div>
                </div>
          </div>
          }

          {!loading && quiz && 
            <div class="col s8 m8 offset-s2 offset-m2">
                <div class="section">
                    <h5>Questions</h5>
                </div>
                <div class="divider"/>
                <QuestionList questions={quiz.questions}/>
            </div>
          }

        <button style={{marginTop:'30px' , marginLeft:'400px'}} className="btn-small waves-effect  green darken-1" > Add another question </button>  
                
           



        </div>
    )
}