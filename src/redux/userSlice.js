import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/auth'
import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const checkAuth = createAsyncThunk('user/checkAuth' , 
        async(thunkAPI) => {
            try {
                const response = await axios.get(`${API_URL}/api/auth/refresh` , {withCredentials:true })
                localStorage.setItem('token' , response.data.accessToken)
                return response.data

            } catch (error) {
                return thunkAPI.rejectWithValue({error:error.response?.data?.message})
            }
        })


export const login = createAsyncThunk('user/login' , 
        async({email,password} , thunkAPI)=>{
            
                try{
                    const response = await AuthService.login({email,password})
                    localStorage.setItem('token' , response.data.accessToken)
                  
                    return response.data
                }catch(e){
                    return thunkAPI.rejectWithValue({error:e.response?.data?.message})
                }

        })


export const registration = createAsyncThunk('user/registration' , 
    async({email,password , username},thunkAPI)=>{
            try {
                const response = await AuthService.registration({email,password , username})
                localStorage.setItem('token' , response.data.accessToken)
                return response.data
            } catch (error) {
                console.log('error in registration catched')
                return thunkAPI.rejectWithValue({error:error.response?.data?.message})
            }
        })

export const logout = createAsyncThunk('user/logout' , 
    async(thunkAPI)=>{
            try {
                console.log('dispatched logout function')
                const response = await AuthService.logout()
                console.log(response.data)
                localStorage.removeItem('token' )
            } catch (error) {
                return thunkAPI.rejectWithValue({error:error.response?.data?.message})
            }
        })


export const userSlice = createSlice({
    name:'user',
    initialState:{
       isAuth:false,
       user:{},
       isLoading:false,
       isActivated:false,
       error:null,
        
    },
    reducers:{
        setAuth:(state , action) =>{
            state.isAuth = action.payload
        },
        setUser:(state , action) =>{
            state.user = action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        }
    },
    extraReducers:(builder) => {

        builder.addCase(login.fulfilled , (state,action)=>{
            state.user = action.payload.user
            state.isAuth = true
            state.isLoading = false
        })
       .addCase(registration.fulfilled , (state,action)=>{
            state.user = action.payload.user
            state.isAuth = true
            state.isLoading = false
        })
       .addCase(logout.fulfilled , (state,action)=>{
            state.user = {}
            state.isAuth = false
        })

        .addCase(checkAuth.fulfilled , (state,action)=>{
            state.isAuth = true
            state.user = action.payload.user
            state.isLoading = false
        })


        .addCase(login.pending , (state,action)=>{
            state.isLoading = true
            state.error = null
        })
        .addCase(registration.pending , (state,action)=>{
            state.isLoading = true
            state.error = null
        })

        .addCase(login.rejected , (state,action ) =>{
            state.isLoading = false
            state.error = action.payload.error
        })
        .addCase(registration.rejected , (state,action ) =>{
            state.isLoading = false
            state.error = action.payload.error
        })
        .addCase(checkAuth.rejected , (state,action ) =>{
            state.isLoading = false
            state.error = action.payload.error
        })
        .addCase(logout.rejected , (state,action ) =>{
            state.isLoading = false
            state.error = action.payload.error
        })
        



    }
})

export const { setLoading } = userSlice.actions

export default userSlice.reducer

