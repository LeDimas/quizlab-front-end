import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import {axios} from '../axios'


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDg2NjBlYTQ0MjYxMzBkYzRhNWYxOCIsInJvbGVzIjpbIlVzZXIiXSwiaWF0IjoxNjI2MDk3MjE0LCJleHAiOjE2MjYxODM2MTR9.S9kcpnyLy5fWMRsI7zytj9dJ1-3oLb7UkYwBqBd3voA'

const {token} = JSON.parse(localStorage.getItem('userData')) 



export const fetchQuiz = createAsyncThunk('quizCreate/fetchQuiz', 
        async (quizId) => {
            try {
                const response = await axios.get(`/api/quiz/${quizId}` ,{
                    headers: {Authorization: 'Bearer ' + token }
                })
                return response.data
            } catch (error) {
                console.log(error)
            }
    })

export const updateQuestionAsync = createAsyncThunk('quizCreate/updateQuestion' , 
        async({quizId , payload})=>{

                const response = await axios.put(`api/quiz/${quizId}/question` , payload
                  , {
                headers: {
                  Authorization: 'Bearer ' + token 
                }})

                return response.data
        })

export const removeQuestionAsync = createAsyncThunk('quizCreate/deleteQuestion' ,

        async({quizId , description}) => {
                await axios.delete(`api/quiz/${quizId}/question` ,
               { data: { questionDescription: description }, headers: { "Authorization":'Bearer ' + token  } }  )

        return description
        })

export const createQuestionAsync = createAsyncThunk('quizCreate/createQuestion' , 
        async({quizId , description , correctAnwser , options }) => {


            const alternatives = options.map((option) => {
                return {text:option, isCorrect: option === correctAnwser}
            })

            const response = await axios.post(`api/quiz/${quizId}/question`  , {description , alternatives} ,  {
                headers: {
                  Authorization: 'Bearer ' + token
                }})

            console.log(response.data)

            return response.data
        })



export const quizCreateSlice = createSlice({
    name:'quizCreate',
    initialState:{
        quizName:'',
        quizDesc:'',
        questions:[],
        
        currentQuestionDesc:'',
        currentQuestionOptions:[],
        currentQuestionOptionText:'',

        status:'idle',
        error:null,
        quizId:''

    },
    reducers:{
      
        setQuizDesc:(state , action) =>{
            state.quizDesc = action.payload
        },
        addQuestion:(state , action) =>{
            
            const alternatives = state.currentQuestionOptions.map((option , i) => {
                return {text:option, isCorrect: option === action.payload , id:i+1}
            })

            const readyQuestion = {description:state.currentQuestionDesc , alternatives};
            state.questions.push(readyQuestion)

            state.currentQuestionDesc =''
            state.currentQuestionOptionText = ''
            state.currentQuestionOptions = []
        },
        setQuizName:(state,action) => {
            state.quizName = action.payload
        },
        setCurrentQuestionDesc:(state,action) => {
            state.currentQuestionDesc = action.payload
        },
        setCurrentQuestionOptionText:(state,action) => {
            state.currentQuestionOptionText = action.payload
        },
        addQuestionOption:(state,_) =>{
            state.currentQuestionOptions.push(state.currentQuestionOptionText)
            state.currentQuestionOptionText=''
        },
        removeQuestionOption:(state,action)=>{
            state.currentQuestionOptions = state.currentQuestionOptions.filter(option => option !== action.payload)
        },
        setQuestionEditFlag:(state,action)=>{

            const newState = state.questions.map((ques) =>{
                if(ques.description === action.payload){
                   return {...ques , toEdit : true , initialQuestion : `${ques.description}` , initialState:ques}
                }
                else{
                    return {...ques , toEdit:false}
                }
            })

            state.questions = newState
        },
        changeQuestionDescription:(state,action) =>{

            for(let question of state.questions)
                if(question.description === action.payload.name)
                    question.description = action.payload.value

        },
        changeQuestionOption:(state,action) => {

            for(let question of state.questions)
                if(question.description === action.payload.description)
                    for(let option of question.alternatives)
                    //fetched case
                       if(option._id)
                            if(option._id === action.payload.id)
                                    option.text = action.payload.value

                    //not fetched case
                       else if(option.id)
                            if(option.id === Number.parseInt(action.payload.id) )
                                    option.text = action.payload.value
   
         },
         applyQuestionChanges:(state,action)=>{

            const newState = state.questions.map((ques) =>{
                if(ques.description === action.payload)
                   return {...ques , toEdit : false}
                else
                    return {...ques}
                
            })

            state.questions = newState
         },
         cancelQuestionChanges:(state , action) =>{

            const newState = state.questions.map((ques) =>{
                
                if(ques.description === action.payload)
                    return {...ques.initialState , toEdit:false }
                else
                    return {...ques , toEdit:false }
                
            })
    
            state.questions = newState
         },
         removeQuestion:(state , action) => {
             state.questions = state.questions.filter(question => question.description !== action.payload)
         },
         clearState:(state  )=>{
            state.quizName = ''
            state.quizDesc=''
            state.questions=[]
            
            state.currentQuestionDesc=''
            state.currentQuestionOptions=[]
            state.currentQuestionOptionText=''
         },
         clearQuestionForm:(state) =>{
            state.currentQuestionDesc=''
            state.currentQuestionOptions=[]
            state.currentQuestionOptionText=''
         }
    
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchQuiz.fulfilled , (state,action)=>{

            state.quizName = action.payload.name
            state.quizDesc = action.payload.description
            state.questions = action.payload.questions
            state.quizId = action.payload._id
            state.status = 'succeeded'
        })

        .addCase(fetchQuiz.rejected , (state,action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(updateQuestionAsync.fulfilled , (state,action) =>{
            state.questions = action.payload.questions.map(question =>  ({...question , toEdit:false}))
           
        })

        .addCase(updateQuestionAsync.rejected , (state,action) => {
            state.error = action.error.message
        })

        .addCase(removeQuestionAsync.fulfilled , (state , action) =>{
            state.questions = state.questions.filter(question => question.description !== action.payload)
        })

        .addCase(removeQuestionAsync.rejected , (state , action)=>{
            // state.status = 'failed'
            state.error = action.error.message
        })

        .addCase(createQuestionAsync.fulfilled , (state, action) => {
            state.questions = action.payload.questions.map(question => ({...question, toEdit:false}))
        })

        .addCase(createQuestionAsync.rejected , (state, action)=>{
            state.error = action.error.message
        })
    }
})

export const { setQuizName ,
             removeQuestionOption ,
             setQuizDesc ,
             addQuestion ,
             setCurrentQuestionDesc, 
             addQuestionOption,
             setCurrentQuestionOptionText,
             setQuestionEditFlag,
             changeQuestionDescription,
             changeQuestionOption,
             applyQuestionChanges,
             cancelQuestionChanges,
             removeQuestion,
             clearQuestionForm,
             clearState} = quizCreateSlice.actions

export default quizCreateSlice.reducer

export const selectQuestionByDesc = (state , desc) => state.quizCreate.questions.find(question => question.description === desc)