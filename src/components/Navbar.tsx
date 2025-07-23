import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const path = useLocation().pathname;
    return (
        <div className="h-16 bg-custom-gradient  z-50 flex items-center sticky top-0 ">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/">
                    <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
                        Linklytics
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
                    <Link to="/register">
                        <li className="-ml-1 sm:ml-0  bg-rose-700 text-white w-22 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300 transition-all duration-150 tracking-wide text-md">
                            Signup
                        </li>
                    </Link>
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