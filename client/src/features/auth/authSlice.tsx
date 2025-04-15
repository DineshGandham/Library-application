import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  };

export const loginUser = createAsyncThunk('auth/login',async (userData)=>{
    const response = await axios.post("http://localhost:5000/api/users/login",userData)
    return response?.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.removeItem('user');
            state.user = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.user = action.payload;
          state.isSuccess = true  
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;