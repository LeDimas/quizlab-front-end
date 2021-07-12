import { configureStore } from '@reduxjs/toolkit'
import quizCreateReducer from './quizCreateSlice'
import quizReducer from './quizSlice'

export default configureStore({
    reducer:{
        quizCreate:quizCreateReducer,
        quiz:quizReducer
    }
})