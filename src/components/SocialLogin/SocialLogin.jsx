import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state?.form?.pathname || '/'
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/user', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate(form, { replace: true });
            })
        })
    }
    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;