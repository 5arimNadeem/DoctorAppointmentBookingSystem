import React, { createContext } from 'react'
import { doctors, assets } from '../assets/assets.js'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const currencySymbol = '$'

    // what ever we add in value object we can access in any component 
    const value = {
        doctors,
        assets,
        currencySymbol
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
