import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import SidebarAdmin from "./navbar";

const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <div className="d-flex">
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
