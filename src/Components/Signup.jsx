import { useState } from "react";
import authService from "../appwrite/auth";
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from "react-redux";
import {useForm} from 'react-hook-form'
import React from "react"

function Signup(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")

   
    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const fetchedUser = await authService.getCurrentUser(); // Fetch user immediately
                if (fetchedUser) {
                    dispatch(login(fetchedUser)); // Update Redux state immediately
                }
                navigate("/"); // Redirect after updating Redux
            }
        } catch (err) {
            setError(err.message);
        }
    };
    
    
    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
                                message: "Email address must be a valid email",
                            }
                            
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
        
    )


}
export default Signup;