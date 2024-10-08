export interface IUser {
    _id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    carts: Array<string>;
    orders: Array<string>;
    imageUrl: string;
    createdAt: any;
    updatedAt: any;
}

export interface AuthPayload {
    _id: string;
}

export interface IAuthContext {
    currentUser: IUser | null;
    userLoggedIn: boolean;
    loading: boolean;
}
