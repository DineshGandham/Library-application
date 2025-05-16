import {useState} from 'react';
import { useDispatch} from 'react-redux';
import { addBook } from '../../features/books/bookSlice';
import { BookData, BookFormEvent, BookFormSubmitEvent } from '../../types/book.types';

export function useBookForm() {
    const [bookData, setBookData] = useState<BookData>({
        title: "",
        author: "",
        coverImage: null
    });
    const dispatch = useDispatch();

    const handleChange = (e: BookFormEvent) => {
        setBookData({...bookData, [e.target.name]: e.target.value});
    }

    const handleFileChange = (e: BookFormEvent) => {
        if (e.target.files) {
            setBookData({...bookData, coverImage: e.target.files[0]});
        }
    }

    const handleSubmit = (e: BookFormSubmitEvent) => {
        e.preventDefault();
        dispatch(addBook({
            title: bookData.title,
            author: bookData.author,
            coverImage: bookData.coverImage
        }));
        setBookData({
            title: "",
            author: "",
            coverImage: null,
        });
    }

    return {
        bookData,
        handleChange,
        handleFileChange,
        handleSubmit
    }
}