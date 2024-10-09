import { FieldError, UseFormRegister } from "react-hook-form";

export type FormSignUpData = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

type ProductType = {
    name: string;
    price: number;
    quantity: number;
};

export type EditProductData = {
    name: string;
    category: string;
    description: string;
    length: {
        value: number;
        unit: string;
    };
    from: string;
    address: string;
    weight: string;
    brand: string;
    productType: Array<ProductType>;
};

export type CreateProductData = {
    productImageFiles: FileList;
    video: FileList;
    name: string;
    category: string;
    description: string;
    length: {
        value: number;
        unit: string;
    };
    from: string;
    offers?: Array<{
        price_from: number;
        price_to: number;
        value: number;
    }>;
    address: string;
    weight: string;
    brand: string;
    colors?: Array<{
        name: string;
        image: FileList;
    }>;
    productType: Array<ProductType>;
};

export type FormSignInData = {
    email: string;
    password: string;
};

export type FormFieldProps = {
    type: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<T>;
    error: FieldError | undefined;
};
