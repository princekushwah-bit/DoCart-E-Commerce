// import React from 'react'
// import Logo from "../assets/logo.png"
// import { useNavigate } from 'react-router-dom'
// import google from '../assets/google.png'
// import { IoEyeOutline } from "react-icons/io5";
// import { toast } from 'react-toastify';
// import { IoEye } from "react-icons/io5";
// import { useState } from 'react';
// import { useContext } from 'react';
// import { authDataContext } from '../context/AuthContext';
// import axios from 'axios';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../../utils/Firebase';
// import { userDataContext } from '../context/UserContext';
// import Loading from '../component/Loading';

// function Login() {
//     let [show, setShow] = useState(false)
//     let [email, setEmail] = useState("")
//     let [password, setPassword] = useState("")
//     let { serverUrl } = useContext(authDataContext)
//     let { getCurrentUser } = useContext(userDataContext)
//     let [loading, setLoading] = useState(false)

//     let navigate = useNavigate()

//     const handleLogin = async (e) => {
//         e.preventDefault()
//         setLoading(true) // Loading start
//         try {
//             let result = await axios.post(serverUrl + '/api/auth/login', {
//                 email, password
//             }, { withCredentials: true })

//             console.log(result.data)
//             setLoading(false) // Success pe stop
//             getCurrentUser()
//             navigate("/")
//           toast.success("User Login Successful", {
//     toastId: 'login-success', // Isse duplicate toast nahi banenge
// });

//         } catch (error) {
//             setLoading(false) // Error aate hi loading band taaki button wapas aa jaye
//             console.log(error)
            
//             // Backend se "User not found" ya "Incorrect password" message nikalne ke liye
//             const errorMsg = error.response?.data?.message || "User Login Failed";
//             toast.error(errorMsg)
//         }
//     }

//     const googlelogin = async () => {
//         try {
//             const response = await signInWithPopup(auth, provider)
//             let user = response.user
//             let name = user.displayName;
//             let email = user.email

//             const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
//             console.log(result.data)
//             getCurrentUser()
//             navigate("/")
//             toast.success("Google Login Successful")

//         } catch (error) {
//             console.log(error)
//             toast.error("Google Login Failed")
//         }

//     }
//     return (
//         <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
//             <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
//                 <img className='w-[40px]' src={Logo} alt="" />
//                 <h1 className='text-[22px] font-sans '>DoShopAI</h1>
//             </div>

//             <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
//                 <span className='text-[25px] font-semibold'>Login Page</span>
//                 <span className='text-[16px]'>Welcome to DoShopAI, Place your order</span>

//             </div>
//             <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center '>
//                 <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
//                     <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googlelogin}>
//                         <img src={google} alt="" className='w-[20px]' /> Login account with Google
//                     </div>
//                     <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
//                         <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
//                     </div>
//                     <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]  relative'>

//                         <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
//                         <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
//                         {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />}
//                         {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]' onClick={() => setShow(prev => !prev)} />}
                        
//                         <button 
//                             type="submit" 
//                             disabled={loading}
//                             className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold disabled:opacity-70'
//                         >
//                             {loading ? <Loading /> : "Login"}
//                         </button>
                        
//                         <p className='flex gap-[10px]'>You haven't any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>Create New Account</span></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login

import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2"; 
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';

const animationStyles = `
@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes slow-bg-glow {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

@keyframes border-color-cycle {
  0% { border-color: rgba(255, 255, 255, 0.1); }
  33% { border-color: rgba(59, 130, 246, 0.5); }
  66% { border-color: rgba(168, 85, 247, 0.5); }
  100% { border-color: rgba(255, 255, 255, 0.1); }
}

@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
  50% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)); }
}

.animate-bg-glow {
  background-size: 200% 200%;
  animation: slow-bg-glow 15s ease infinite;
}

.animate-btn-gradient {
  background-size: 300% 300%;
  animation: gradient-move 5s ease infinite;
}

.animate-logo-glow {
  animation: pulse-glow 3s infinite;
}

.hover-border-animate:hover {
  animation: border-color-cycle 2s linear infinite;
}
`;

function Login() {
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("Welcome to DoCart!", { toastId: 'login-success' });
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Login Failed")
        }
    }

    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            await axios.post(serverUrl + "/api/auth/googlelogin", { name: response.user.displayName, email: response.user.email }, { withCredentials: true })
            getCurrentUser()
            navigate("/")
            toast.success("Google Login Successful")
        } catch (error) {
            toast.error("Google Login Failed")
        }
    }

    return (
        <>
            <style>{animationStyles}</style>
            
            <div className='w-full min-h-screen bg-[#0a0a0b] bg-[radial-gradient(circle_at_center,_#1a3a42_0%,_#0a0a0b_60%,_#0a0a0b_100%)] animate-bg-glow text-white flex flex-col items-center overflow-x-hidden'>
                
                {/* Brand Logo & Name */}
                <div className='w-full h-[100px] flex items-center px-8 lg:px-16 gap-3 cursor-pointer self-start' onClick={() => navigate("/")}>
                    <div className='bg-blue-600/20 p-2 rounded-xl border border-blue-500/30 animate-logo-glow'>
                        <HiOutlineShoppingBag size={32} className='text-blue-400' />
                    </div>
                    <h1 className='text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent animate-btn-gradient'>
                        DoCart
                    </h1>
                </div>

                {/* Main Content */}
                <div className='flex-1 flex flex-col items-center justify-center w-full px-4 pb-12 mt-[-40px]'>
                    <div className='text-center mb-10'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-3 tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent'>Sign In</h2>
                        <p className='text-gray-400 text-sm md:text-base'>Enter your details to access your <span className='text-blue-400'>DoCart</span> account.</p>
                    </div>

                    {/* Glassmorphism Card */}
                    <div className='max-w-[450px] w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all hover:border-white/20'>
                        
                        <form onSubmit={handleLogin} className='flex flex-col gap-6'>
                            
                            <div 
                                onClick={googlelogin}
                                className='w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 cursor-pointer transition-all active:scale-95 hover-border-animate'
                            >
                                <img src={google} alt="google" className='w-5' />
                                <span className='text-sm font-medium'>Continue with Google</span>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='flex-1 h-[1px] bg-white/10'></div>
                                <span className='text-[10px] text-gray-600 uppercase tracking-widest font-bold'>secure mail</span>
                                <div className='flex-1 h-[1px] bg-white/10'></div>
                            </div>

                            <div className='space-y-5'>
                                <input 
                                    type="email" 
                                    className='w-full h-12 bg-black/30 border border-white/10 rounded-xl px-5 outline-none focus:border-blue-500 transition-all font-medium placeholder:text-gray-700 hover-border-animate'
                                    placeholder='Email Address'
                                    required 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email}
                                />

                                <div className='relative'>
                                    <input 
                                        type={show ? "text" : "password"} 
                                        className='w-full h-12 bg-black/30 border border-white/10 rounded-xl px-5 outline-none focus:border-blue-500 transition-all font-medium placeholder:text-gray-700 hover-border-animate'
                                        placeholder='Password'
                                        required 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        value={password}
                                    />
                                    <div 
                                        className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-white'
                                        onClick={() => setShow(!show)}
                                    >
                                        {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className='w-full h-13 mt-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-btn-gradient text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center'
                            >
                                {loading ? <Loading /> : "Login"}
                            </button>

                            <p className='text-center text-sm text-gray-400 mt-2'>
                                Don't have an account? 
                                <span 
                                    className='text-blue-400 font-semibold cursor-pointer hover:text-blue-300 ml-2 transition-colors'
                                    onClick={() => navigate("/signup")}
                                >
                                    Register
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login