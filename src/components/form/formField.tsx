import { memo } from "react";
import { FormFieldProps } from "../../types/form";

interface IFormFieldProps extends FormFieldProps {
    className?: string;
    id?: string;
}

const FormField = (props: IFormFieldProps) => {
    const { placeholder, name, type, error, register, className, id } = props;

    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name)}
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
