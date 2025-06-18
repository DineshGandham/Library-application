import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
}

interface BookState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

interface BookFormData {
  title: string;
  author: string;
  coverImage?: File;
}

export const fetchBooks = createAsyncThunk<Book[]>(
  "books/fetchBooks",
  async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    return response.data;
  }
);

export const addBook = createAsyncThunk<Book, BookFormData>(
  "books/addBook",
  async (bookData) => {
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    if (bookData.coverImage) {
      formData.append("coverImage", bookData.coverImage);
    }

    const response = await axios.post("http://localhost:5000/api/books", formData);
    return response.data;
  }
);

const initialState: BookState = {
  books: [],
  status: 'idle'
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.books = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.books.push(action.payload);
      });
  },
});

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;