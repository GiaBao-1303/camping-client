import { memo } from "react";
import { FormFieldProps } from "../../types/form";

interface IFormFieldProps extends FormFieldProps {
    className?: string;
    id?: string;
    disabled?: boolean;
    attrs?: Record<string, any>;
    onChange?: any | null;
    [key: string]: any;
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
        ...rest
    } = props;

    return (
        <>
            <input
                {...rest}
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                disabled={disabled}
                className={className}
                {...props.attrs}
                onChange={(e) => {
                    if (props.onChange) props.onChange(e);
                    register(name).onChange(e);
                }}
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
