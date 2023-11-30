import React, { useContext, useEffect, useState } from 'react';
import loginImg from  '../../assets/others/authentication2.png'
import loginBg from  '../../assets/others/authentication.png'
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    useEffect(()=> {
        loadCaptchaEnginge(6);
    },[])

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signInUser(email, password)
        .then(result => {
            const user = result.user
            console.log(user);
            toast.success('Successfully Login!')
            navigate(from, { replace: true });
        })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200" style={{backgroundImage: `url(${loginBg})`}}>
            <div className="hero-content lg:flex">
                <div className="text-center lg:text-left">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className="text-2xl mt-4 text-center font-bold">Login now!</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered"  />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered"  />
                        </div>
                        <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                        <div className="form-control mt-6">
                        <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                        <p>New here? <Link to='/register'>Create a New Account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;