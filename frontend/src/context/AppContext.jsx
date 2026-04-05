import React, { createContext, useEffect, useState } from 'react'
import { doctors, assets } from '../assets/assets.js'
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currencySymbol = '$'
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const navigate = useNavigate()

    const [userData, setUserData] = useState(false)
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl, '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }
    }

    // what ever we add in value object we can access in any component 
    const value = {
        doctors,getDoctorsData,navigate,
        assets,
        currencySymbol,
        backendUrl,token, setToken, userData, setUserData, loadUserProfileData  
    }

    useEffect(() => {
        getDoctorsData()
    }, []);

    useEffect(() => {

        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token]);
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

