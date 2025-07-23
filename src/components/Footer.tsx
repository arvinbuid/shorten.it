import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="bg-custom-gradient p-8 relative mt-4 w-full">
            <div className="container flex flex-col lg:flex-row lg:justify-between items-center gap-4 mx-auto px-6 lg:px-4 text-zinc-100">
                <p className="mt-4 lg:mt-0 text-sm">
                    &copy; {date} Shorten.it. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 lg:mt-0">
                    <a href="#" className="hover:text-gray-200">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaTwitter size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;