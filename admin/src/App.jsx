import { useContext } from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from "./context/AdminContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

const App = () => {

  const { aToken } = useContext(AdminContext)
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      {/* <Login /> */}
      <ToastContainer />
      <Navbar />
      <div className="flex item-start">

        <Sidebar />
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
};

export default App;  
