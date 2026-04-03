import React, { useContext } from 'react'
// import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext'

const About = () => {
  const { assets } = useContext(AppContext)
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='flex flex-col my-10 md:flex-row gap-12'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.about_image} alt="" />
        <div className='flex flex-col my-10 gap-6 justify-center md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores iusto ratione voluptates modi qui hic illo sunt, unde consequatur facilis mollitia quo. Accusamus, officiis doloribus? At, officiis fugiat? Consequuntur, mollitia.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores iusto ratione voluptates modi qui hic illo sunt, unde consequatur facilis mollitia quo. Accusamus, officiis doloribus? At, officiis fugiat? Consequuntur, mollitia.</p>
          <b className='text-gray-900'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores iusto ratione voluptates modi qui hic illo sunt, unde consequatur facilis mollitia quo. Accusamus, officiis doloribus? At, officiis fugiat? Consequuntur, mollitia.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p className=' text-gray-500'>WHY <span className='text-gray-900 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all text-gray-500 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, consequuntur.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all text-gray-500 cursor-pointer'>
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, consequuntur.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all text-gray-500 cursor-pointer'>
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, consequuntur.</p>

        </div>
      </div>
    </div>
  )
}

export default About
