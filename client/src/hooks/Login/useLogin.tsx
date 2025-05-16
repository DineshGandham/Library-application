import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';
import { LoginData, AuthState } from '../../types';

export function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, message } = useSelector((state: { auth: AuthState }) => state.auth);
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
            const result = await dispatch(loginUser(userData)).unwrap();
            console.log("Login Success:", result);
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