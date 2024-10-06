import { memo } from "react";
import { FormFieldProps } from "../../types/form";

interface IFormFieldProps extends FormFieldProps {
    className?: string;
    id?: string;
    disabled?: boolean;
}

const FormField = (props: IFormFieldProps) => {
    const {
        placeholder,
        name,
        type,
        error,
        register,
        className,
        id,
        disabled,
    } = props;

    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                disabled={disabled}
                className={className}
            />
            {error && (
                <span className="mt-2 d-block text-danger">
                    {error.message}
                </span>
            )}
        </>
    );
};

export default memo(FormField);
