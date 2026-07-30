import axios from "axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {user,signOutUser}=useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        // request interceptor
        const interceptorId = instance.interceptors.request.use((config)=>{
            const token = localStorage.getItem('token');
            if(token){
                 config.headers.authorization = `Bearer ${token}`
            }
           
            return config
        })
        // response interceptor

     const responseInterceptor = instance.interceptors.response.use(res => {
            return res;
        },err=>{
            const status = err.status;
            if(status ===401 || status === 403){
                // console.log('log out the user for bad request');
                signOutUser()
                .then(()=>{
                    // navigate user to login page 
                    navigate('/register')

                })
            }
        })

        // cleanup: remove this interceptor when user changes / component unmounts
        // otherwise a new interceptor gets stacked on every render
        return () =>{ 
            instance.interceptors.request.eject(interceptorId);
            instance.interceptors.response.eject(responseInterceptor)
        }
    },[user,navigate,signOutUser]);

    return  instance;
};

export default useAxiosSecure;