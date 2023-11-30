import React, { useContext } from 'react';
import loginImg from '../../assets/others/authentication2.png'
import loginBg from '../../assets/others/authentication.png'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const form = location.state?.form?.pathname || '/'
    const onSubmit = (data) => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                updateUserProfile(data.name)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/user', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('Registration Successfully')
                                    navigate(form, { replace: true });
                                }
                            })
                    })

            })
    }
    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${loginBg})` }}>
            <div className="hero-content lg:flex">
                <div className="text-center lg:text-left">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-2xl mt-4 text-center font-bold">Register now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className=' text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' {...register("email")} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/ })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && (
                                <p className=' text-red-500'>Password is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className=' text-red-500'>Password must be 6 char</p>
                            )}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must contain at least one capital letter,One special character</p>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary uppercase" type="submit" value="Register" />
                        </div>
                        <SocialLogin></SocialLogin>
                        <p>Already have Account <Link to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;