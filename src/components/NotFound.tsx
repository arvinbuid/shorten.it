import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
    message: string
}

const NotFound = ({ message }: NotFoundProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6">
            <FaExclamationTriangle className='text-4xl sm:text-6xl text-red-500 mb-4' />
            <h1 className='text-xl sm:text-3xl font-semibold mb-2 text-gray-800 text-center'>
                Oops! Something went wrong.
            </h1>
            <p className="text-gray-600 mb-6 mt-1 sm:mt-3 text-center">
                {message ? message : "An unexpected error has occured"}
            </p>
            <button onClick={() => {
                navigate("/");
            }}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
            >
                Back to Home
            </button>
        </div>
    );
}

export default NotFound;