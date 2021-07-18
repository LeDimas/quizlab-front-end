import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import QuizService from '../services/quizService'



export const createQuiz = createAsyncThunk('quizes/createQuiz' , 
        async({quizForm , questionForm}) =>{
            try {
                return await QuizService.createQuiz({quizForm , questionForm})
            } catch (error) {
                console.log(error)
            }
           
        })

export const deleteQuiz = createAsyncThunk('quizes/deleteQuiz' , 
        async(quizName)=>{
            try {
              await QuizService.deleteQuiz(quizName)
              return quizName
            } catch (error) {
                console.log(error)
            }
        })


export const fetchQuizes = createAsyncThunk('quizes/fetchQuizes', 
        async () => {
            try {
                const response = await QuizService.fetchQuizes()
                return response.data
            } catch (error) {
                console.log(error)
            }
    })

export const quizSlice = createSlice({
    name:'quiz',
    initialState:{
        data:[],
        status:'idle',
        error:null,
        
    },
    reducers:{
    },
    extraReducers:(builder) => {
        // fetching quiz

        builder.addCase(fetchQuizes.pending ,(state,action) => {
            state.status = 'loading'
        } )

        .addCase(fetchQuizes.fulfilled ,(state,action) => {
            state.status = 'succeeded'
            state.data = state.data.concat(action.payload)
        } )

        .addCase(fetchQuizes.rejected ,(state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        } )

        //removing quiz
       .addCase(deleteQuiz.fulfilled ,(state,action) => {
            console.log('action payload' , action)
            state.data = state.data.filter(quiz => quiz._id.name !== action.payload)
        } )

        .addCase(deleteQuiz.rejected , (state,action) =>{
            //im not sure about this one
            // state.status = 'failed/delete'
            state.error = action.error.message
        })

        //creating quiz
        .addCase(createQuiz.fulfilled , (state,action) => {
            state.status = 'succeeded'
            state.data.push(action.payload)
        })

        .addCase(createQuiz.rejected , (state,action)=>{
            state.error = action.error.message
        })
        .addCase(createQuiz.pending , (state , action) =>{
            state.status = 'loading'
        })
    

    }
})

export const { } = quizSlice.actions

export default quizSlice.reducer

export const selectQuizBy = (state,identifier) => state.data.find(quiz => quiz === identifier)

export const selectAllData = state => state.quiz.data