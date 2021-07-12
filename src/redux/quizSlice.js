import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
// import { AuthContext } from '../context/authContext'
import {axios} from '../axios'


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDg2NjBlYTQ0MjYxMzBkYzRhNWYxOCIsInJvbGVzIjpbIlVzZXIiXSwiaWF0IjoxNjI2MDk3MjE0LCJleHAiOjE2MjYxODM2MTR9.S9kcpnyLy5fWMRsI7zytj9dJ1-3oLb7UkYwBqBd3voA'


const {token} = JSON.parse(localStorage.getItem('userData')) 

export const createQuiz = createAsyncThunk('quizes/createQuiz' , 
        async({quizForm , questionForm}) =>{

            const response = await axios.post('api/quiz' ,  quizForm , {
                headers: {
                  Authorization: 'Bearer ' + token
                }})

            const quizId = response.data._id;

            console.log('quiz id :' , quizId)

            for await (const _ of questionForm.map(
                question => axios.post(`api/quiz/${quizId}/question`  , {...question} ,  {
                    headers: {
                      Authorization: 'Bearer ' + token
                    }})
                )){}

            return {_id:{name:response.data.name , id:quizId}}

        })

export const deleteQuiz = createAsyncThunk('quizes/deleteQuiz' , 
        async(quizName)=>{
            try {
              const response = await axios.delete('api/quiz/' ,
                    { data: { quizName: quizName },
                     headers: { "Authorization":'Bearer ' + token } }  )
              
              console.log('response data',response.data)

              return quizName

            } catch (error) {
                console.log(error)
            }
        })


export const fetchQuizes = createAsyncThunk('quizes/fetchQuizes', 
        async () => {
            try {
                const response = await axios.get(`/api/myQuizList` ,{
                    headers: {Authorization: 'Bearer ' + token }
                })
    
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