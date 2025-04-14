import { configureStore } from "@reduxjs/toolkit";
import boolReducer from '../features/books/bookSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer : {
        books: boolReducer,
        auth : authReducer
    }
})

