import { Outlet, useNavigate } from "react-router-dom";
import { getUserById } from "../../queries";
import { getSession } from "../../utility/cookie.utility";
import { useEffect, useState } from "react";

const RequireAdmin = () => {
    const [loading, setLoading] = useState(true);
    const _id = getSession("_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (!_id) {
            navigate("/sign-in");
            return;
        }
        getUserById("users", _id)
            .then((res) => {
                if (!res) return navigate("/sign-in");
                if (res.role !== "admin") return navigate("/");
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [_id, navigate]);

    if (loading) {
        return (
            <div
                style={{
                    left: "50%",
                }}
                className="position-absolute top-50 translate-middle"
            >
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    console.log("Checking admin permissions...");

    return <Outlet />;
};

export default RequireAdmin;
