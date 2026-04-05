import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData, assets } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      
      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers: {token}})

      if (data.succes)
      {
        toast.success(data.message)

        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit
          ? <lable htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" /><img className='w-36 absolute bottom-12 right-12' src={ image ? '' : assets.upload_icon } alt="" /></div>
            <input type="file" name="" onChange={(e) => setImage(e.target.files[0])} id='image' hidden />
          </lable>
          : <img className='w-36 rounded' src={userData.image} alt="" />
      }

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'> CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                <br />
                <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
              </p>
              : <p className='bg-gray-50'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      {/* basic information */}

      <div className='py-2'>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100'
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
                name="" id=""><option value="Male">Male</option>
                <option value="Female">Female</option></select>
              : <p className='max-w-20 bg-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>


      <div className='mt-10'>
        {
          isEdit
            ? <button
              onClick={updateUserProfileData }
              className='border border-gray-500 bg-gray-200 text-black px-7 py-3 rounded-full font-light hidden md:block hover:bg-amber-500 hover:text-black duration-500 transition-all'>Save Information
            </button>
            : <button
              onClick={() => setIsEdit(true)}
              className='border border-gray-500 bg-gray-200 text-black px-7 py-3 rounded-full font-light hidden md:block hover:bg-amber-500 hover:text-black duration-500 transition-all'>Edit
            </button>
        }
      </div>
    </div>
  )
}

export default MyProfile
