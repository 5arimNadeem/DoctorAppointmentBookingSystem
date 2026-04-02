import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import DoctorContextProvider from './context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DoctorContextProvider>
      <App />
    </DoctorContextProvider>
  </BrowserRouter>,
)
