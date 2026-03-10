import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col  bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'}/>
      
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        {/* Left Side: Image */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center '>
          <img src={contact} alt="Contact Us" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>

        {/* Right Side: Content */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          
          <p className='lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px]'>Our Store</p>
          
          {/* Address Section - Changed outer <p> to <div> */}
          <div className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            <p>462003, H5 Manit</p>
            <p>Bhopal, Madhya Pradesh, India</p>
          </div>

          {/* Contact Section - Changed outer <p> to <div> */}
          <div className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            <p>Tel: +91-9981798239</p>
            <p>Email: princecse362@gmail.com</p>
          </div>

          <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>Careers at DoCart</p>
          
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            Learn more about our teams and job openings
          </p>
          
          <button className='px-[30px] py-[15px] flex items-center justify-center text-[white] bg-transparent border hover:bg-white/10 active:bg-slate-600 rounded-md transition-all'>
            Explore Jobs
          </button>
        </div>
      </div>
      
      <NewLetterBox/>
    </div>
  )
}

export default Contact