import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../../utility/cookie.utility";
import { getUserById } from "../../queries";

const RequireAuth = () => {
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

    return <Outlet />;
};

export default RequireAuth;
