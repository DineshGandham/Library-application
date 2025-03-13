import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks",async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    return response.data;
});

export const addBook = createAsyncThunk("books/addBook",async (bookData) =>{
    console.log(bookData)
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    if(bookData.coverImage) {
        formData.append("coverImage",bookData.coverImage)
    }

    const response = await axios.post("http://localhost:5000/api/books",formData);
    return response.data;
});

const booksSlice = createSlice({
    name: "books",
    initialState: { books: [], status: "idle" },
    extraReducers: (builder) => {
      builder.addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      }).addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      });
    },
  }); 

export default booksSlice.reducer;