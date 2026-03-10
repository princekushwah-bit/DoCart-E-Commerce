// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { authDataContext } from './AuthContext'
// import axios from 'axios'

// export const userDataContext = createContext()
// function UserContext({children}) {
//     let [userData,setUserData] = useState("")
//     let {serverUrl} = useContext(authDataContext)


//    const getCurrentUser = async () => {
//         try {
//             let result = await axios.get(serverUrl + "/api/user/getcurrentuser",{withCredentials:true})

//             setUserData(result.data)
//             console.log(result.data)

//         } catch (error) {
//             setUserData(null)
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//      getCurrentUser()
//     },[])



//     let value = {
//      userData,setUserData,getCurrentUser
//     }
    
   
//   return (
//     <div>
//       <userDataContext.Provider value={value}>
//         {children}
//       </userDataContext.Provider>
//     </div>
//   )
// }

// export default UserContext


import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({children}) {
    const [userData, setUserData] = useState(null) // Shuru mein null rakho
    const [loading, setLoading] = useState(true) // ✨ Initial loading state
    const { serverUrl } = useContext(authDataContext)

    const getCurrentUser = async () => {
        try {
            // Check shuru ho raha hai
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
            setUserData(result.data)
            console.log("User Data Fetched:", result.data)
        } catch (error) {
            setUserData(null)
            console.log("Auth Error:", error)
        } finally {
            // Chahe success ho ya error, loading band kar do
            setLoading(false)
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    let value = {
        userData, 
        setUserData, 
        getCurrentUser,
        loading // ✨ Isse App.jsx mein use karenge
    }
    
    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext