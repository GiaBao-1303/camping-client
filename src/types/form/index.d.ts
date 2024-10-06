import { FieldError, UseFormRegister } from "react-hook-form";

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
    name: FormFieldNames;
    register: UseFormRegister<T>;
    error: FieldError | undefined;
};

type FormFieldNames = ValidFieldNamesSignIn | ValidFieldNamesSignUp;

export type ValidFieldNamesSignIn = "email" | "password";

export type ValidFieldNamesSignUp =
    | "name"
    | "email"
    | "password"
    | "passwordConfirm";

export type ValidFieldNameProduct =
    | "productImageFiles"
    | "video"
    | "name"
    | "category"
    | "description"
    | "productType"
    | "length"
    | "totalQuantity"
    | "from"
    | "offers"
    | "address";
