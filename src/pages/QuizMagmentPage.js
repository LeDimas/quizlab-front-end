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
import {Link} from 'react-router-dom'



export const QuizManagmentPage = () =>{
    const {token} = useContext(AuthContext)
    const {request , loading} = useHttp()
    const [quiz , setQuiz] = useState(null)
    const quizId = useParams().quizId
    const [createNew , setCreateNew] = useState(false)

    const getQuiz = useCallback(async () => {
        try{
           const fetchedQuiz =  await request(`/api/quiz/${quizId}` , 'GET' , null ,{
                Authorization: `Bearer ${token}`
            })

            

            setQuiz(fetchedQuiz)
            console.log(fetchedQuiz)
        }catch(e){

        }
    } ,[token , quizId , request])

    useEffect(()=>{
        getQuiz()
    },[getQuiz])

    const cbUpdateQuestion = async (updateData , quizId) =>{

      
        try{
            const response = await axios.put(`api/quiz/${quizId}/question` , {description:updateData.description , oldDescription:updateData.oldDescription , alternatives:updateData.alternatives} , {
                headers: {
                  Authorization: 'Bearer ' + token 
                }})
            console.log(response)
        

        }catch(e){
            console.log(e)
        }



    }

    const handleOpenQuestionForm = () =>{
        setCreateNew(true)
    }

         
    const cbCreateQuestion = (response) =>{
        setCreateNew(false)
        setQuiz(response.data)

        console.log(response.data)
    }

  


    // todo:make forbidden view


    if(loading){
        return <Loader/>
    }

    const cbDeleteQuestion = async (callbAckQuestion) => {

        try{
            
        const newQuestionState =  quiz.questions.filter((questObj) => questObj.description !== callbAckQuestion.description)
        setQuiz({...quiz , questions:newQuestionState})

        console.log(quiz)


       const response = await axios.delete(`api/quiz/${callbAckQuestion.quiz}/question` ,
       { data: { questionDescription: callbAckQuestion.description }, headers: { "Authorization":'Bearer ' + token  } }  )

        console.log(response)

        }catch(e){
            console.log(e)
        }

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
                <QuestionList cbUpdateQuestion={cbUpdateQuestion} cbDeleteQuestion={cbDeleteQuestion} questions={quiz.questions}/>
            </div>
          }
        {
            !createNew ? <button style={{marginTop:'30px' , marginLeft:'400px'}} onClick={handleOpenQuestionForm} className="btn-small waves-effect  green darken-1" > Add another question </button>   : <span></span>
        }

        
                
        {
            createNew ? <CreateQuestion cbCreateQuestion={cbCreateQuestion} quizId={quizId} /> : <span></span>
        }

        <Link to="/profile">
            <button style={{width:'190px',marginTop:'30px' , marginLeft:'405px'}} className="btn-small waves-effect  blue darken-1" > Back to Profile </button> 
        </Link>




        </div>
    )
}