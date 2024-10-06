import React, { useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { db } from "../configs";
import { collection, where, query } from "firebase/firestore";
import { getSession } from "../utility/cookie.utility";

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<any>(null);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const token = getSession("_id");
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [userLoggedIn, serUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {}, []);
};
