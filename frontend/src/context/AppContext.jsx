import React, { createContext } from 'react'
import { doctors, assets } from '../assets/assets.js'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'

    // what ever we add in value object we can access in any component 
    const value = {
        doctors,
        assets,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider