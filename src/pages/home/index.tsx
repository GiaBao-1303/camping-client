import { Link, redirect } from "react-router-dom";
import { useAuth } from "../../Auth";

const HomePage = () => {
    const { saveToken } = useAuth();

    return (
        <div>
            <h1>This is Home Page</h1>
            <button
                onClick={() => {
                    console.log("set token successfully");
                    saveToken({ accessToken: "123", refreshToken: "123" });
                }}
            >
                SetToken
            </button>
            <Link to="/admin">Admin</Link>
        </div>
    );
};

export default HomePage;
