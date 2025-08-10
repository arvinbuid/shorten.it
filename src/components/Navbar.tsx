import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useJwt } from "../context/useJwtContext";

const Navbar = () => {
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { token, setToken } = useJwt();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("JWT_TOKEN");
        navigate("/login");
    }

    return (
        <div className="h-16 bg-custom-gradient  z-50 flex items-center sticky top-0 ">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/">
                    <h1 className="font-bold text-3xl text-white font-raleway">
                        Shorten.it
                    </h1>
                </Link>
                <ul
                    className={`flex flex-col sm:flex-row sm:gap-8 gap-4 sm:items-center px-4 sm:px-0 sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] shadow-md sm:shadow-none ${navbarOpen ? "h-fit sm:pb-0 pb-5 bg-custom-gradient" : "h-0 overflow-hidden shadow-none"} transition-all duration-100 sm:h-fit sm:bg-none sm:w-fit w-full uppercase text-sm tracking-tight`}
                >
                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/" ? "text-white font-semibold" : "text-gray-200"}`}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/about" ? "text-white font-semibold" : "text-gray-200"}`}
                            to="/about"
                        >
                            About
                        </Link>
                    </li>
                    {token && (
                        <li className="font-[500] transition-all duration-150">
                            <Link
                                className={`${path === "/about" ? "text-white font-semibold" : "text-gray-200"}`}
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                    {!token && (
                        <Link to="/login">
                            <li className="-ml-1 bg-rose-700 text-white w-22 text-center uppercase px-2 py-2 rounded-md  hover:text-slate-300 transition-all duration-150 tracking-wide text-md">
                                Login
                            </li>
                        </Link>
                    )}
                    {token && (
                        <button
                            onClick={handleLogout}
                            className="ml-0 sm:-ml-2 bg-rose-700 text-white w-22 text-center uppercase px-2 py-2 rounded-md  hover:text-slate-300 transition-all duration-150 tracking-tight text-[14px]"
                        >
                            Logout
                        </button>
                    )}
                </ul>
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden flex items-center sm:mt-0 mt-2"
                >
                    {navbarOpen ? (
                        <RxCross2 className="text-white text-3xl" />
                    ) : (
                        <IoIosMenu className="text-white text-3xl" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Navbar;