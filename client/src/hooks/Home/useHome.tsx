import {useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchBooks} from '../../features/books/bookSlice'
import {logout} from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';

export function useHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.books);
    const [isOpen,setIsOpen] =useState(false);
    useEffect(()=>{
        dispatch(fetchBooks())
    },[dispatch])
    const closeModal = () => setIsOpen(false);
    const handleLogOut = () => {
        dispatch(logout());
        navigate("/login")
    }
    return {
        isOpen,
        setIsOpen,
        closeModal,
        books,
        handleLogOut
    }
}