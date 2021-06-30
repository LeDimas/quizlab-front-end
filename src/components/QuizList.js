
import {Link} from 'react-router-dom'
import {QuizLink} from '../components/QuizLink'

export const QuizList = ({quizes , cbRemoveQuiz}) => {

    

    if(!quizes || quizes.message === 'no quizes')
    {
        return(
            <div className="col s10 m7 offset-m1">
                    <h2>
                        My quizes
                    </h2>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text center-align">
                        <span className="card-title">Seems you don't have any quizes yet</span>
                        </div>
      
                        <div className="card-action center-align">
                        <Link to="/create">
                            <button className="btn blue darken-5 " >Create your first quiz</button>
                        </Link>
                        
                        </div>
                    </div>
                </div>
        )
    }else{
        return(
            <div className="col s10 m7 offset-m1">
                        <h2>
                            My quizes
                        </h2>
    
    
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
    
                           <ul className="collection">
                               {
                                   quizes.map((quizObj , i)=>{
                                       return <QuizLink cbRemoveQuizFromQuizList={cbRemoveQuiz} key={i} quizId={`${quizObj._id.id}`} quizName={`${quizObj._id.name}`}/>
                                   })
                               }
                           </ul>
    
    
                            
                            <div className="card-action">
                            <Link to="/create">
                                <button className="btn blue darken-5 " >Create another quiz</button>
                            </Link>  
                            </div>
                        </div>
                    </div>
    
                </div>
    
        )

    }

    

}