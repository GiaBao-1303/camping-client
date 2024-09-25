import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type FormSignUpData = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type FormSignInData = {
    email: string;
    password: string;
};

export type FormFieldProps = {
    type: string;
    placeholder?: string;
    name: ValidFieldNamesSignIn | ValidFieldNamesSignUp;
    register: UseFormRegister<T>;
    error: FieldError | undefined;
};

export type ValidFieldNamesSignIn = "email" | "password";

export type ValidFieldNamesSignUp =
    | "name"
    | "email"
    | "password"
    | "passwordConfirm";
