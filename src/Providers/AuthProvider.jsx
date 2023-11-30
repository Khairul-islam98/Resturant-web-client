import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser] =  useState(null)
    const[loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser);
            if(currentUser){
                const userInfo = { email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
            }else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return () => unsubscribe()
    },[axiosPublic])

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;