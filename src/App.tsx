import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import About from "./components/About"
import LandingPage from "./components/LandingPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RegisterForm from "./components/RegisterForm"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App