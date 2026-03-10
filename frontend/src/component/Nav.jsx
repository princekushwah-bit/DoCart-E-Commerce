// import React, { useContext, useState } from 'react'
// import logo from '../assets/logo.png'
// import { IoSearchCircleOutline } from "react-icons/io5";
// import { FaCircleUser } from "react-icons/fa6";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { userDataContext } from '../context/UserContext';
// import { IoSearchCircleSharp } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { IoMdHome } from "react-icons/io";
// import { HiOutlineCollection } from "react-icons/hi";
// import { MdContacts } from "react-icons/md";
// import axios from 'axios';
// import { authDataContext } from '../context/AuthContext';
// import { shopDataContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';

// function Nav() {
//     let { getCurrentUser, userData, setUserData } = useContext(userDataContext)
//     let { serverUrl } = useContext(authDataContext)
//     let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
//     let [showProfile, setShowProfile] = useState(false)
//     let navigate = useNavigate()

//     const handleLogout = async () => {
//         try {
//             const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
//             console.log(result.data)
            
//             // 1. User state ko null set karo taaki UI turant update ho
//             if (setUserData) {
//                 setUserData(null);
//             }
            
//             // 2. Navigat karo aur page ko reload kardo taaki saari states clear ho jayein
//             navigate("/login")
//             window.location.reload(); 
            
//             toast.success("Logged out successfully")
//         } catch (error) {
//             console.log(error)
//             toast.error("Logout failed")
//         }
//     }

//     return (
//         <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black '>

//             <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] '>
//                 <img src={logo} alt="" className='w-[100px]' />
//                 <h1 className='text-[22px] md:text-[25px] text-[black] font-sans '>DoShopAI</h1>
//             </div>
            
//             <div className='w-[50%] lg:w-[40%] hidden md:flex'>
//                 <ul className='flex items-center justify-center gap-[19px] text-[white] '>
//                     <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/")}>HOME</li>
//                     <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
//                     <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
//                     <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
//                 </ul>
//             </div>

//             <div className='w-[30%] flex items-center justify-end gap-[20px]'>
//                 {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
//                 {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
                
//                 {!userData ? (
//                     <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
//                 ) : (
//                     <div className='w-[35px] h-[35px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer font-bold border-2 border-white' onClick={() => setShowProfile(prev => !prev)}>
//                         {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'U'}
//                     </div>
//                 )}
                
//                 <div className='relative hidden md:block'>
//                     <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={() => navigate("/cart")} />
//                     <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] -top-[5px] -right-[5px]'>{getCartCount()}</p>
//                 </div>
//             </div>

//             {showSearch && (
//                 <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center '>
//                     <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]' placeholder='Search Here' onChange={(e) => { setSearch(e.target.value) }} value={search} />
//                 </div>
//             )}

//             {showProfile && (
//                 <div className='absolute w-[220px] h-auto bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-20 overflow-hidden shadow-xl'>
//                     <ul className='w-[100%] flex items-start justify-around flex-col text-[17px] py-[5px] text-[white]'>
//                         {!userData ? (
//                             <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
//                                 navigate("/login"); setShowProfile(false)
//                             }}>Login</li>
//                         ) : (
//                             <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer border-b border-[#ffffff21]' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>
//                         )}
//                         <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }} >Orders</li>
//                         <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }} >About</li>
//                     </ul>
//                 </div>
//             )}

//             {/* Mobile Bottom Navigation */}
//             <div className='w-[100vw] h-[70px] flex items-center justify-around px-[10px] text-[10px] fixed bottom-0 left-0 bg-[#191818] z-20 md:hidden border-t border-[#ffffff21]'>
//                 <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[24px] h-[24px]' /> Home</button>
//                 <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/collection")}><HiOutlineCollection className='w-[24px] h-[24px]' /> Collections</button>
//                 <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/contact")}><MdContacts className='w-[24px] h-[24px]' />Contact</button>
//                 <div className='relative'>
//                     <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[24px] h-[24px]' /> Cart</button>
//                     <p className='absolute w-[16px] h-[16px] flex items-center justify-center bg-white text-black font-bold rounded-full text-[9px] -top-[5px] -right-[5px]'>{getCartCount()}</p>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Nav

import React, { useContext, useState, useEffect } from 'react' // useEffect add kiya
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation add kiya
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2"; 
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

function Nav() {
    let { getCurrentUser, userData, setUserData } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    let [showProfile, setShowProfile] = useState(false)
    
    let navigate = useNavigate()
    let location = useLocation() // URL track karne ke liye

    // ✨ Fix: Jab bhi route change ho, search bar aur profile menu band ho jaye
    useEffect(() => {
        setShowSearch(false);
        setShowProfile(false);
    }, [location.pathname]); 

    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            if (setUserData) {
                setUserData(null);
            }
            navigate("/login")
            window.location.reload(); 
            toast.success("Logged out successfully")
        } catch (error) {
            console.log(error)
            toast.error("Logout failed")
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black/10 backdrop-blur-md'>

            <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <div className='bg-blue-600/10 p-1.5 rounded-lg border border-blue-500/20'>
                    <HiOutlineShoppingBag size={28} className='text-blue-600' />
                </div>
                <h1 className='text-[22px] md:text-[25px] text-[black] font-black tracking-tighter uppercase'>DoCart</h1>
            </div>
            
            <div className='w-[50%] lg:w-[40%] hidden md:flex'>
                <ul className='flex items-center justify-center gap-[19px] text-[white] '>
                    <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/")}>HOME</li>
                    <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
                    <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
                    <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
                </ul>
            </div>

            <div className='w-[30%] flex items-center justify-end gap-[20px]'>
                {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => { setShowSearch(true); navigate("/collection") }} />}
                {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(false)} />}
                
                {!userData ? (
                    <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
                ) : (
                    <div className='w-[35px] h-[35px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer font-bold border-2 border-white' onClick={() => setShowProfile(prev => !prev)}>
                        {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'U'}
                    </div>
                )}
                
                <div className='relative hidden md:block'>
                    <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={() => navigate("/cart")} />
                    <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] -top-[5px] -right-[5px] font-bold'>{getCartCount()}</p>
                </div>
            </div>

            {showSearch && (
                <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center '>
                    <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]' placeholder='Search Here' onChange={(e) => { setSearch(e.target.value) }} value={search} autoFocus />
                </div>
            )}

            {showProfile && (
                <div className='absolute w-[220px] h-auto bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-20 overflow-hidden shadow-xl'>
                    <ul className='w-[100%] flex items-start justify-around flex-col text-[17px] py-[5px] text-[white]'>
                        {!userData ? (
                            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
                                navigate("/login"); setShowProfile(false)
                            }}>Login</li>
                        ) : (
                            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer border-b border-[#ffffff21]' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>
                        )}
                        <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }} >Orders</li>
                        <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }} >About</li>
                    </ul>
                </div>
            )}

            {/* Mobile Nav */}
            <div className='w-[100vw] h-[70px] flex items-center justify-around px-[10px] text-[10px] fixed bottom-0 left-0 bg-[#191818] z-20 md:hidden border-t border-[#ffffff21]'>
                <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[24px] h-[24px]' /> Home</button>
                <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/collection")}><HiOutlineCollection className='w-[24px] h-[24px]' /> Collections</button>
                <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/contact")}><MdContacts className='w-[24px] h-[24px]' />Contact</button>
                <div className='relative'>
                    <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[24px] h-[24px]' /> Cart</button>
                    <p className='absolute w-[16px] h-[16px] flex items-center justify-center bg-white text-black font-bold rounded-full text-[9px] -top-[5px] -right-[5px]'>{getCartCount()}</p>
                </div>
            </div>

        </div>
    )
}

export default Nav