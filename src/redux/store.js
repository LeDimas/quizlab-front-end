import { configureStore } from '@reduxjs/toolkit'
import quizCreateReducer from './quizCreateSlice'
import quizReducer from './quizSlice'
import userReducer from './userSlice'
import gameReducer from './gameSlice'

export default configureStore({
    reducer:{
        quizCreate:quizCreateReducer,
        quiz:quizReducer,
        user:userReducer,
        game:gameReducer
    }
})