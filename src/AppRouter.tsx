import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ShortenUrlPage from "./components/dashboard/ShortenUrlPage";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Error from "./components/Error";

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Toaster />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterForm /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><Login /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                <Route path="/error" element={<Error />} />
                <Route path="/*" element={<NotFound message="We can't seem to find the page that you're looking for." />} />
            </Routes>
            <Footer />
        </>
    );
}

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}