import { Outlet, useNavigate } from "react-router-dom";
import { getSession } from "../../utility/cookie.utility";
import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces";
import { getUserById } from "../../queries/user.query";

const RedirectIfLoggedIn: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser | null>();
    const _id = getSession("_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (!_id) {
            setLoading(false);
            setUser(null);
            return;
        }
        getUserById("users", _id)
            .then((res) => {
                if (res) {
                    navigate("/");
                    return;
                } else {
                    setLoading(false);
                    setUser(null);
                }
            })
            .catch(console.error);
    }, [_id, navigate]);

    if (loading && !user) {
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

export default RedirectIfLoggedIn;
