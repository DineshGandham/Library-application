import {useState} from 'react'
import axios from 'axios';

export function useLogin () {
    const [userData,setUserData] = useState({"email":'',"password":'' })

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        try{
            console.log("submited")
        }catch (error){
            console.error(error)
        }
    }

    return {
        userData,
        setUserData,
        handleSubmit,
        handleChange
    }

}