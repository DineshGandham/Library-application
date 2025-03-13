import {useState} from 'react';
import { useDispatch} from 'react-redux';
import { addBook } from '../../features/books/bookSlice';
export function useBookForm() {
    const [bookData,setBookData] = useState({title:"", author:"", coverImage:null})
    const dispatch = useDispatch();

    const handleChange =(e)=> {
        setBookData({...bookData,[e.target.name]:e.target.value})
    }
    const handleFileChange = (e)=> {
        setBookData({...bookData,coverImage:e.target.files[0]})
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(addBook({
            title: bookData.title,
            author: bookData.author,
            coverImage: bookData.coverImage
        }));
        // setBookData({
        //     title: "",
        //     author: "",
        //     coverImage: null,
        //   });
    }
    return{
        bookData,
        handleChange,
        handleFileChange,
        handleSubmit
    }
}