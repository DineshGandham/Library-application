import {useState} from 'react'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function useLogin () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading,isError,message} = useSelector((state)=>state.auth)
    const [userData,setUserData] = useState({"email":'',"password":'' })

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

      const handleSubmit = async (e: React.FormEvent) => {
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
    }

}