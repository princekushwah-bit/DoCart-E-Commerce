import React, { useContext, useState } from 'react'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2"; 
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

const animationStyles = `
@keyframes slow-bg-glow {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
  50% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)); }
}

.animate-bg-glow {
  background-size: 200% 200%;
  animation: slow-bg-glow 15s ease infinite;
}

.animate-logo-glow {
  animation: pulse-glow 3s infinite;
}
`;

function Login() {
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { serverUrl } = useContext(authDataContext)
    let { getAdmin } = useContext(adminDataContext)
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const AdminLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
            toast.success("Admin Login Successful")
            getAdmin()
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Admin Login Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <style>{animationStyles}</style>
            
            <div className='w-full min-h-screen bg-[#0a0a0b] bg-[radial-gradient(circle_at_center,_#1a3a42_0%,_#0a0a0b_60%,_#0a0a0b_100%)] animate-bg-glow text-white flex flex-col items-center overflow-x-hidden'>
                
                {/* Brand Logo & Name */}
                <div className='w-full h-[100px] flex items-center px-8 lg:px-16 gap-3 self-start'>
                    <div className='bg-blue-600/20 p-2 rounded-xl border border-blue-500/30 animate-logo-glow'>
                        <HiOutlineShoppingBag size={32} className='text-blue-400' />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-black tracking-tighter uppercase'>DoCart</h1>
                        <span className='text-[10px] text-blue-500 font-bold tracking-[3px] mt-[-3px]'>ADMIN</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex-1 flex flex-col items-center justify-center w-full px-4 pb-12 mt-[-40px]'>
                    <div className='text-center mb-10'>
                        <h2 className='text-4xl md:text-5xl font-extrabold mb-3 tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent'>Admin Access</h2>
                        <p className='text-gray-400 text-sm md:text-base'>Enter your credentials to manage <span className='text-blue-400'>DoCart</span>.</p>
                    </div>

                    {/* Glassmorphism Card */}
                    <div className='max-w-[450px] w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]'>
                        
                        <form onSubmit={AdminLogin} className='flex flex-col gap-6'>
                            
                            <div className='space-y-5'>
                                <div className='relative'>
                                    <input 
                                        type="email" 
                                        className='w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 outline-none focus:border-blue-500/50 transition-all font-medium placeholder:text-gray-700'
                                        placeholder='Admin Email'
                                        required 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        value={email}
                                    />
                                </div>

                                <div className='relative'>
                                    <input 
                                        type={show ? "text" : "password"} 
                                        className='w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 outline-none focus:border-blue-500/50 transition-all font-medium placeholder:text-gray-700'
                                        placeholder='Password'
                                        required 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        value={password}
                                    />
                                    <div 
                                        className='absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-white transition-colors'
                                        onClick={() => setShow(!show)}
                                    >
                                        {show ? <IoEye size={22} /> : <IoEyeOutline size={22} />}
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className='w-full h-14 mt-4 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center'
                            >
                                {loading ? <Loading /> : "LOGIN TO DASHBOARD"}
                            </button>

                            <p className='text-center text-[10px] text-gray-500 uppercase tracking-widest'>
                                Authorized Personnel Only
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login