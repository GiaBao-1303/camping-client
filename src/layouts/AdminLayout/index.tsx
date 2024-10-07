import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import SidebarAdmin from "./navbar";

const AdminLayout = () => {
    return (
        <div
            style={{
                overflow: "hidden",
                boxSizing: "border-box",
                width: "100%",
                height: "100vh",
            }}
        >
            <AdminHeader />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "14% 1fr",
                }}
            >
                <SidebarAdmin />
                <div
                    style={{
                        overflow: "auto",
                        height: "calc(100vh - 61px)",
                    }}
                    className="flex-grow-1 p-4"
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
