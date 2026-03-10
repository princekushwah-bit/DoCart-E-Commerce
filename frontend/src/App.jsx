import React, { useCallback, useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import Loading from './component/Loading' // 👈 Loading component import kiya
import 'react-toastify/dist/ReactToastify.css';
import AiChatbot from './component/AiChatbot';

function App() {
  // ✨ UserContext se userData ke saath loading state bhi nikali
  let { userData, loading } = useContext(userDataContext)
  let location = useLocation()

  // ✨ Jab tak authentication check ho raha hai, tab tak sirf Loader dikhao
  if (loading) {
    return (
      <div className='w-full h-screen bg-[#0a0a0b] flex items-center justify-center'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {userData && !['/login', '/signup'].includes(location.pathname) && <Nav />}

      <Routes>
        <Route path='/login'
          element={userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Login />)
          } />

        <Route path='/signup'
          element={userData ? (<Navigate to={location.state?.from || "/"} />)
            : (<Registration />)} />

        <Route path='/'
          element={userData ? <Home /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/about'
          element={userData ? <About /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/collection'
          element={userData ? <Collections /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/product'
          element={userData ? <Product /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/contact'
          element={userData ? <Contact /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/productdetail/:productId'
          element={userData ? <ProductDetail /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/cart'
          element={userData ? <Cart /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/placeorder'
          element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='/order'
          element={userData ? <Order /> : <Navigate to="/login" state={{from: location.pathname}} />} />

        <Route path='*' element={<NotFound />} />
      </Routes>

      {userData && !['/login', '/signup'].includes(location.pathname) && <Ai />}
      <AiChatbot />
    </>
    
  )
}

export default App