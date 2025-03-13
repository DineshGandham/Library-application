import {useState ,useEffect} from 'react';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import {fetchBooks} from '../../features/books/bookSlice'

export function useHome() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const [isOpen,setIsOpen] =useState(false);
    useEffect(()=>{
        dispatch(fetchBooks())
    },[dispatch])
    console.log(books)
    const closeModal = () => setIsOpen(false);
    return {
        isOpen,
        setIsOpen,
        closeModal,
        books
    }
}