import axios from "axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const instance = axios.create({
    baseURL:'https://shopex-smart-deal-server.vercel.app'
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
            const status = err.response?.status;
            if(status ===401 || status === 403){
                // console.log('log out the user for bad request');
                signOutUser()
                .then(()=>{
                    Swal.fire({
                        icon: "warning",
                        title: "Session expired",
                        text: "Please log in again to continue.",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    // navigate user to login page
                    navigate('/register')

                })
            }
            // important: propagate the error so .then()/.catch() in components still work
            return Promise.reject(err);
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