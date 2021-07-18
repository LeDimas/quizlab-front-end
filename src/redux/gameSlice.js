import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import GameService from '../services/gameService'

export const fetchGame = createAsyncThunk('game/fetchGame' , 
        async(gameLink , thunkAPI) => {
            try {
                console.log('aaaa?')
                const response = await GameService.fetchGame(gameLink)
                console.log(response.data)
                return response.data
            } catch (error) {
                return thunkAPI.rejectWithValue({error:error.response?.data?.message})
            }
        })



export const gameSlice = createSlice({
    name:'game',
    initialState:{
        data:null,
        permissionGranted:false,
        extraData:null,
        error:null,
        status:'idle'
    },
    reducers:{

    },
    extraReducers:(builder) => {

        builder.addCase(fetchGame.fulfilled , (state,action)=>{
            state.status = 'finished'
            state.data = action.payload
        })

        .addCase(fetchGame.rejected , (state,action)=>{
            state.error = action.payload
            state.status = 'rejected'
        })

        .addCase(fetchGame.pending , (state,action)=>{
            state.status='loading'
        })



    }
})

export const {  } = gameSlice.actions

export default gameSlice.reducer

