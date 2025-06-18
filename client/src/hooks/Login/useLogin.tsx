import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import { AppDispatch, RootState } from '../../app/store';

interface LoginData {
    email: string;
    password: string;
}

export function useLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);
    const [userData, setUserData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(userData)).unwrap();
            navigate("/");
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    return {
        userData,
        setUserData,
        handleSubmit,
        handleChange,
        isLoading,
        isError,
        message
    };
}