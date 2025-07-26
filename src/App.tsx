import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import About from "./components/About"
import LandingPage from "./components/LandingPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import DashboardLayout from "./components/dashboard/DashboardLayout"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App