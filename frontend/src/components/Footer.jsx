import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Footer = () => {
    const { assets } = useContext(AppContext)
    return (
        <div className='md:mx-10'>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div >
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, commodi. Saepe perferendis sequi non tempora. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, magnam. Aut modi mollitia atque corporis impedit magni inventore quia dolore.</p>
                </div>
                {/* center */}
                <div className="">
                    <p className='text-xl font-medium mb-5 '>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/*  right */}
                <div className="">
                    <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+92-79077222</li>
                        <li>lore@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="">
                <hr />
                <p className='py-5 text-sm text-center'>CopyRight 2026@ Prescripto - All Rights Reserved</p>
            </div>
            {/*left  */}

        </div>
    )
}

export default Footer