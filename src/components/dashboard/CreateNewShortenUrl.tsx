import { type Dispatch, type SetStateAction } from "react";
import { useJwt } from "../../context/useJwtContext";
import { useForm, type FieldValues } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ShortenedUrlItem } from "../../hooks/useQuery";

import TextField from "../TextField";
import Tooltip from "@mui/material/Tooltip";
import api from "../../api/api";
import toast from "react-hot-toast";

interface CreateShortenUrlResponse {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    createdDate: string;
    username: string;
}

interface FormFields extends FieldValues {
    originalUrl: string;
}

interface CreateNewShortenUrlProps {
    setOpen: Dispatch<SetStateAction<boolean>>

}

const CREATE_SHORTEN_URL = "/api/urls/shorten"
const SUBDOMAIN_URL = import.meta.env.VITE_REACT_SUBDOMAIN_URL

const CreateNewShortenUrl = ({ setOpen }: CreateNewShortenUrlProps) => {
    const { token } = useJwt();
    const queryClient = useQueryClient();

    // React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
        defaultValues: {
            originalUrl: ""
        },
        mode: "onTouched"
    });

    // Mutation function
    const createShortenUrl = async (data: { originalUrl: string }): Promise<CreateShortenUrlResponse> => {
        const { data: res } = await api.post(CREATE_SHORTEN_URL, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        });
        return res;
    }

    // useMutation hook
    const mutation = useMutation<CreateShortenUrlResponse, Error, FormFields, { previousUrls: ShortenedUrlItem[] | undefined }>({
        mutationFn: createShortenUrl,
        onMutate: async (newUrl) => {
            await queryClient.cancelQueries({ queryKey: ["shortenUrls"] });
            const previousUrls = queryClient.getQueryData<ShortenedUrlItem[]>(["shortenUrls"]); // Snapshot of previous url data

            // Create optimistic url
            const optimisticShortenUrl = {
                id: Math.floor(Math.random() * -1000000), // Using a negative ID to avoid conflicts
                originalUrl: newUrl.originalUrl,
                shortUrl: 'creating...',
                clickCount: 0,
                createdDate: new Date().toISOString(),
                username: '' // TODO
            }

            queryClient.setQueryData<ShortenedUrlItem[]>(['shortenUrls'], (old) => {
                return old ? [optimisticShortenUrl, ...old] : [optimisticShortenUrl];
            })

            // Return context object with optimistic url
            return { previousUrls }
        },
        onSuccess: (data) => {
            toast.success("Short url copied to clipboard!", {
                duration: 2000
            });
            queryClient.invalidateQueries({ queryKey: ["shortenUrls"] });
            const shortenUrl = `${SUBDOMAIN_URL}/${data.shortUrl}`
            navigator.clipboard.writeText(shortenUrl);
        },
        onError: (error, context) => {
            toast.error("Error creating short url.");
            queryClient.setQueryData(['shortenUrls'], context?.previousUrls);

        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["shortenUrls"] });
            setOpen(false);
            reset();
        },
        retry: 3,
    })

    const createShortenUrlHandler = (data: FormFields) => {
        mutation.mutate(data);
    }

    const isLoading = mutation.isPending;

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
                    disabled={isLoading}
                    type="submit"
                    className="text-white bg-custom-gradient w-full py-3 rounded-md mt-6 mb-3 text-sm"
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>

                {/* Close Modal Button */}
                <Tooltip title="Close">
                    <button
                        disabled={isLoading}
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