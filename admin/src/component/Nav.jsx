// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import logo from "../assets/logo.png"
// import axios from 'axios'
// import { authDataContext } from '../context/AuthContext'
// import { adminDataContext } from '../context/AdminContext'
// import { toast } from 'react-toastify'

// function Nav() {
//     let navigate = useNavigate()
//     let {serverUrl} = useContext(authDataContext)
//     let {getAdmin} = useContext(adminDataContext)

//     const logOut = async () => {
//         try {
//             const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
//             console.log(result.data)
//             toast.success("LogOut Successfully")
//             getAdmin()
//             navigate("/login")

//         } catch (error) {
//             console.log(error)
//             toast.error("LogOut Failed")
//         }
        
//     }
//   return (
//     <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex  items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black '>
//         <div className='w-[30%]  flex items-center justify-start   gap-[10px] cursor-pointer ' onClick={()=>navigate("/")}>
//         <img src={logo} alt=""  className='w-[100px]'/>
//         <h1 className='text-[25px] text-[black] font-sans '>DoShopAI</h1>

       


//         </div>
//          <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white ' onClick={logOut}>LogOut</button>
      
//     </div>
//   )
// }

// export default Nav


import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { HiOutlineShoppingBag } from "react-icons/hi2"; 

function Nav() {
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let { getAdmin } = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")
            window.location.reload(); 
        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
    }

    return (
        /* Website wala exact color bg-[#ecfafaec] aur backdrop-blur add kiya hai */
        <div className='w-full h-[70px] bg-[#ecfafaec] backdrop-blur-md z-50 fixed top-0 flex items-center justify-between px-[30px] shadow-md border-b border-gray-200'>
            
            {/* Logo & Brand Name */}
            <div className='flex items-center gap-[12px] cursor-pointer' onClick={() => navigate("/")}>
                <div className='bg-blue-600 p-1.5 rounded-lg shadow-lg'>
                    <HiOutlineShoppingBag size={24} className='text-white' />
                </div>
                <div className='flex flex-col leading-tight'>
                    <h1 className='text-[22px] text-black font-black tracking-tighter uppercase'>DoCart</h1>
                    <span className='text-[10px] text-blue-600 font-bold tracking-[2px] mt-[-3px]'>ADMIN PANEL</span>
                </div>
            </div>

            {/* Logout Button - Modern dark style */}
            <button 
                className='text-[14px] font-bold bg-black text-white py-[8px] px-[22px] rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-md' 
                onClick={logOut}
            >
                LogOut
            </button>
      
        </div>
    )
}

export default Nav