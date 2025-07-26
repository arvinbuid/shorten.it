import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import TextField from "./TextField";

interface LoginFormFields extends FieldValues {
    username: string;
    password: string;
}

const LOGIN_URL = "/api/auth/public/login";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormFields>({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onTouched"
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginHandler = async (data: LoginFormFields) => {
        try {
            setLoading(true);
            const { data: response } = await api.post(LOGIN_URL, data);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token)); // store token in local storage
            reset();
            navigate("/dashboard");
            toast.success("Login successful!");
        } catch (e) {
            console.error(e);
            toast.error("Invalid credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="w-[360px] sm:w-[380px] shadow-custom rounded-md py-8 px-6 sm:px-8 mx-6 my-6"
            >
                <h1 className="text-center font-semibold text-2xl lg:text-3xl text-btnColor">Login</h1>
                <p className="text-center mt-2 text-sm">Login to your account.</p>

                {/* Input Fields */}
                <div className="flex flex-col gap-4 mt-8 space-y-1">
                    {/* Username */}
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required."
                        placeholder="John Doe"
                        register={register}
                        errors={errors}
                    />
                    {/* Password */}
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required."
                        placeholder="Type your password"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="text-white bg-custom-gradient w-full py-3 rounded-md mt-6 mb-3 text-sm "
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-1'>
                    Don't have an account?
                    <Link
                        className='hover:font-semibold transition-all duration-100'
                        to="/register">
                        <span className='text-btnColor'> Sign up</span>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;