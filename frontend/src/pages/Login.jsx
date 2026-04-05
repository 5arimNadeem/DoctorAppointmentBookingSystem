import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {

    if (token) {
      navigate('/')
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className='min-h-[80vh] flex flex-col items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-400 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book Appointment</p>

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name:</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text" name="username"
              onChange={(e) => setName(e.target.value)} value={name} required
            />
          </div>
        }


        <div className='w-full'>
          <p>Email:</p>
          <input type="email" name="email"
            className='border border-zinc-300 rounded w-full p-2 mt-1'

            onChange={(e) => setEmail(e.target.value)} value={email} required
          />
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <input type="password" name="password"
            className='border border-zinc-300 rounded w-full p-2 mt-1'

            onChange={(e) => setPassword(e.target.value)} value={password} required
          />
        </div>

        <button
          type='submit'
          // onClick={() => navigate('/login')}
          className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-primary hover:text-black duration-500 transition-all'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {
          state === "Sign Up" ? <p className=' text-gray-500'>Already hava an account ?  <span onClick={() => setState('Login')}
            className='text-gray-900 font-semibold cursor-pointer underline'>Login here</span></p> :
            <p className=' text-gray-500'>Create a new account ?  <span onClick={() => setState('Sign Up')} className='text-gray-900 font-semibold cursor-pointer underline'>Click here</span></p>
        }

      </div>
    </form>
  )
}

export default Login