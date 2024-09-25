import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth";
import { useEffect, useState } from "react";
import { LoadingPage } from "../pages";

const PrivateRoutes = () => {
    const { accessToken, saveAuth } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // FetchData Profile
    useEffect(() => {
        setIsLoading(true);
        new Promise((resolve) => {
            setTimeout(() => {
                resolve("");
            }, 2000);
        })
            .then((res) => {
                // saveAuth()
            })
            .catch((err) => {
                // Handle Error
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (!accessToken) return <Navigate to="/sign-in" />;

    if (isLoading) {
        return <LoadingPage />;
    }

    return <Outlet />;
};
export default PrivateRoutes;
