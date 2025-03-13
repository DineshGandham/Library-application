import { configureStore } from "@reduxjs/toolkit";
import boolReducer from '../features/books/bookSlice'

export const store = configureStore({
    reducer : {books: boolReducer}
})
