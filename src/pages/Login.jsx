import { useState } from "react"
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import ThemeChanger from '../components/ThemeChanger/ThemeChanger';
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleEmailLogin(e) {
        e.preventDefault();

        try {
            setError("")
            setLoading(true)

            // Make an HTTP POST request to your backend API endpoint
            const response = await axios.post('http://localhost:8000/login/', {
                email,
                password,
            });

            // Handle successful response
            const { data } = response;
            if (data.success) {
                const cookies = new Cookies(null, { path: '/' });
                await cookies.set('session_id', data.session_id);
                await cookies.set('user_id', data.user_id);
                await cookies.set('expiry_time', data.expiry_time);
                navigate("/");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Failed to login - " + err.message);
        }

        setLoading(false)
    }
    
    async function handlePasswordReset() {
        // const email = prompt('Please enter your email ');
        // resetPassword(email);
        // alert('Email sent! Check your inbox for password reset instructions');
    }

    return (
        <main>
            <div className="bg-white px-16 py-6 rounded-lg shadow-xl mt-10">
                <div className="flex justify-center">
                    <h1 className="text-black tracking-[.025em] text-black font-semibold mt-3 mb-8 text-4xl italic">Welcome Back!</h1>
                </div>

                <form className="">
                    <div className="mb-6">
                        <label htmlFor="default-input" className="block mb-2 text-medium font-medium text-gray-900">Email <span className="text-red-600">*</span></label>
                        <input type="text" id="email" name="email" className="border-b border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 focus:px-1" placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="default-input" className="block mb-2 text-medium font-medium text-gray-900">Password <span className="text-red-600">*</span></label>
                        <input type="password" id="password" name="password" className="border-b border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 focus:px-1" placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    
                    <div className="flex flex-row-reverse">
                        <a href="" className="text-slate-700 text-sm hover:text-slate-800" onClick={handlePasswordReset}>Forgot password?</a>
                    </div>  
                    

                    <div className="flex justify-center my-6">
                        <button className="btn w-full" onClick={(e)=>handleEmailLogin(e)} disabled={loading}>Login</button> 
                    </div>

                    {
                        error && 
                        <div className="text-black justify-center flex text-red-500 italic text-sm">
                            {error}
                        </div>
                    }
                </form>

                <div className="flex justify-center my-6">
                    <p className="text-slate-700">Don't have an account? <Link to="/signup" className="font-semibold">Sign up</Link></p> 
                </div>

                <div className="flex justify-center mb-6">
                    <ThemeChanger />
                </div>
                
            </div>   
        </main>
    )
}