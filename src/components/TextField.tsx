import { type FieldErrors, type FieldValues, type UseFormRegister, type Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
    label: string;
    id: Path<T>;
    type: string;
    errors: FieldErrors<T>;
    register: UseFormRegister<T>;
    required: boolean;
    message: string;
    className?: string;
    min?: number;
    value?: string;
    placeholder?: string;
}

const EMAIL_REGEX_VALUE = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/;
const URL_REGEX_VALUE = /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/;

const TextField = <T extends FieldValues>({ label, id, type, errors, register, required, message, className, min, placeholder }: TextFieldProps<T>) => {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id as string}
                className={`${className ? className : ""} text-sm`}
            >
                {label}
            </label>

            <input
                type={type}
                id={id as string}
                placeholder={placeholder}
                className={`${className ? className : ""} text-sm px-3 py-2 border outline-none bg-transparent *:text-slate-700 rounded-md
                    placeholder:text-gray-400 placeholder:text-sm
                            ${errors[id]?.message ? "border-red-500" : "border-gray-400"}`}

                {...register(id,
                    {
                        required: { value: required, message },
                        minLength: min ? { value: min, message: "Minimum of 6 characters are required" } : undefined,
                        pattern:
                            type === "email"
                                ? {
                                    value: EMAIL_REGEX_VALUE,
                                    message: "Invalid email",
                                }
                                : type === "url" ?
                                    {
                                        value: URL_REGEX_VALUE,
                                        message: "Please enter a valid url",
                                    }
                                    : undefined,
                    })
                }
            />

            {errors[id]?.message && (
                <p className="text-sm font-semibold text-red-600 mt-0">
                    {errors[id]?.message?.toString()}
                </p>
            )}
        </div>
    );
}

export default TextField;