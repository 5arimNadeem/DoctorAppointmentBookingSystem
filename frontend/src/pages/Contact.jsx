import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Contact = () => {
  const { assets } = useContext(AppContext)
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className=' text-gray-500'>CONTACT <span className='text-gray-900 font-semibold'>US</span></p>
      </div>

      <div className='flex

        flex-col my-10 justify-center md:flex-row gap-10 mb-28 text-sm'>

        <img
          className='md:max-w-[560px]'

          src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' text-gray-500 text-2xl'>OUR OFFICE</p>
          <p>Lorem ipsum <br /> dolor sit amet.</p>
          <p>Tel: (432) 888-0132 <br /> Email: sarim@gmail.com</p>
          <p className=' text-gray-500 text-2xl'>CAREERS AT PERSCRIPTO</p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <button className='border border-black px-8 p-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

      </div>
    </div>
  )
}

export default Contact