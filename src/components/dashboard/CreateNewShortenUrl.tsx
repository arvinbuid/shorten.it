import { useState, type Dispatch, type SetStateAction } from "react";
import { useJwt } from "../../context/useJwtContext";
import { useForm, type FieldValues } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import type { TransformedShortenUrlData } from "../../hooks/useQuery";

import TextField from "../TextField";
import Tooltip from "@mui/material/Tooltip";
import api from "../../api/api";
import toast from "react-hot-toast";

interface FormFields extends FieldValues {
    originalUrl: string;
}

interface CreateNewShortenUrlProps {
    setOpen: Dispatch<SetStateAction<boolean>>
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TransformedShortenUrlData, Error>>
}

const CREATE_SHORTEN_URL = "/api/urls/shorten"
const SUBDOMAIN_URL = import.meta.env.VITE_REACT_SUBDOMAIN_URL

const CreateNewShortenUrl = ({ setOpen }: CreateNewShortenUrlProps) => {
    const { token } = useJwt();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
        defaultValues: {
            originalUrl: ""
        },
        mode: "onTouched"
    });

    const createShortenUrlHandler = async (data: FormFields) => {
        try {
            setLoading(true);
            const { data: res } = await api.post(CREATE_SHORTEN_URL, data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            const shortenUrl = `${SUBDOMAIN_URL}/${res.shortUrl}`;
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short url copied to clipboard!", {
                    duration: 2000
                });
            })

            reset();
            setOpen(false);
        } catch (e) {
            toast.error("Error creating short url.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center bg-white rounded-md">
            <form
                onSubmit={handleSubmit(createShortenUrlHandler)}
                className="w-[360px] sm:w-[450px] relative shadow-custom pt-8 pb-6 px-4 sm:px-8 rounded-lg"
            >
                <h1 className="font-raleway mt-3 sm:mt-0 text-center sm:text-2xl font-bold text-[22px] text-slate-800 ">
                    Create New Shorten Url
                </h1>

                <div className="mt-6">
                    <TextField
                        label="Enter Url"
                        required
                        id="originalUrl"
                        type="url"
                        message="*Url is required."
                        placeholder="https://example.com"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="text-white bg-custom-gradient w-full py-3 rounded-md mt-6 mb-3 text-sm"
                >
                    {loading ? "Creating..." : "Create"}
                </button>

                {/* Close Modal Button */}
                <Tooltip title="Close">
                    <button
                        disabled={loading}
                        onClick={() => setOpen(false)}
                        className="absolute top-3 right-4"
                    >
                        <RxCross2 className="text-slate-800 text-3xl" />
                    </button>
                </Tooltip>
            </form>
        </div>
    );
}

export default CreateNewShortenUrl; 