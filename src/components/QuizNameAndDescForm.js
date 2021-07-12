import { setQuizDesc , setQuizName } from '../redux/quizCreateSlice'
import { useDispatch , useSelector } from 'react-redux'
import {useMessage} from '../hooks/message.hook'

export const QuizNameAndDescForm = ({toggleCreated}) =>{

    const message = useMessage();
    const dispatch = useDispatch()
    const quizRedux = useSelector((state) => state.quizCreate)


    const quizNameChangeHandler = e => {
        dispatch(setQuizName(e.target.value))
    }
    const quizDescChangeHandler = e => {
        dispatch(setQuizDesc(e.target.value))
    }

    const createHandler = () =>{
       
        if(quizRedux.quizName ==='' || quizRedux.quizDesc ===''){
            message('All fields must be filled')
                return
            }
            toggleCreated()
    }


    return (
        <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>

            {/* Quiz Name Input Field */}
            <div className="input-field">
                <input placeholder="Enter quiz name" id="quizName" type="text" value={quizRedux.quizName} 
                            name="quizName"  onChange={quizNameChangeHandler} />            
            </div>
        
            {/* Quiz Description Input Field */}
            <div className="input-field">
                <input placeholder="Enter quiz description" id="quizDescription" type="text" value={quizRedux.quizDesc} 
                            name="description"  onChange={quizDescChangeHandler} />
            </div>
        
            {/* Apply Button */}
            <div className="center-align">
                <button className="btn red darken-5" onClick={createHandler} >Create</button>
            </div>
        
        </div>
    )
}