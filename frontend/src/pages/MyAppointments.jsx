import React, { useContext, useState } from 'react'
// import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { doctors, assets, backendUrl, token, getDoctorsData, navigate } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number[dateArray[1]]] + " " + dateArray[2]

  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments)
      }
    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      console.log(appointmentId)
    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order_id,
      receipt: order.receipt,
      handler: async (responce) => {
        console.log(responce)
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', responce, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })

      if (data.success) {
        console.log(data.order)
        initPay(data.order)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }

  }, [token]);
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      {/* <div key={index}> */}
      <div>
        {doctors.slice(0, 4).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div >
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p className='text-neutral-800 font-semibold'>{item.docData.speciality}</p>
              <p>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              
              {!item.cancelled && item.payment && 
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-100 hidden md:block hover:text-black duration-500 transition-all'>Paid
                </button>

              }
              {!item.cancelled && item.payment &&
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className='border border-gray-100 bg-gray-200 text-black px-7 py-3 rounded font-light hidden md:block hover:bg-primary hover:text-black duration-500 transition-all'>Pay Online
                </button>

              }
              {!item.cancelled &&
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='border border-gray-100 bg-gray-200 text-black px-7 py-3 rounded font-light hidden md:block hover:bg-primary hover:text-black duration-500 transition-all'>Cancel Appointment
                </button>
              }

              {
                item.cancelled &&
                <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded '>Appointment Cancelled</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
