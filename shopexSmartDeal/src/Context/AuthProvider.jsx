import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

const googleProvider =new GoogleAuthProvider()

const AuthProvider = ( { children } ) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)

    const creatUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }


    const signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const signOutUser=()=>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false)
        })
        return()=>{
            unsubscribe()
        }
    },[])
    const authInfo ={
        creatUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        loading,
        setLoading,
        user,
    }
    return (
        <div>
            <AuthContext value={authInfo}>
                    {children}
            </AuthContext>
            
        </div>
    );
};

export default AuthProvider;