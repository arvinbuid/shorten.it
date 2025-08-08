import { useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextField from "./TextField";
import api from "../api/api";
import toast from "react-hot-toast";

interface RegisterFormFields extends FieldValues {
    username: string;
    email: string;
    password: string;
}

const REGISTER_URL = "/api/auth/public/register";

const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormFields>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched"
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const registerHandler = async (data: RegisterFormFields) => {
        try {
            setLoading(true);
            await api.post(REGISTER_URL, data);
            reset();
            navigate("/login");
            toast.success("Registration successful!");
        } catch (e) {
            console.error(e);
            toast.error("Error registering user.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="w-[360px] sm:w-[380px] shadow-custom rounded-md py-8 px-6 sm:px-8 mx-6 my-6"
            >
                <h1 className="text-center font-semibold text-2xl lg:text-3xl text-btnColor">Sign Up</h1>
                <p className="text-center mt-2 text-sm">Create an account to get started.</p>

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
                    {/* Email */}
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required."
                        placeholder="sample@example.com"
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
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-1'>
                    Already have an account?
                    <Link
                        className='hover:font-semibold transition-all duration-100'
                        to="/login">
                        <span className='text-btnColor'> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;