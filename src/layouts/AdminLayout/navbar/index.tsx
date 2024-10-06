import classNames from "classnames/bind";
import styles from "./SidebarAdmin.module.css";
import { NavLink } from "react-router-dom";

const cl = classNames.bind(styles);

const SidebarAdmin = () => {
    return (
        <div className={cl("sidebar")}>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin"
                end
            >
                <i className="bi bi-house"></i> Dashboard
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin/users"
            >
                <i className="bi bi-person"></i> Quản Lý Người Dùng
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin/products"
            >
                <i className="bi bi-box"></i> Quản Lý Sản Phẩm
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin/orders"
            >
                <i className="bi bi-cart"></i> Đơn Hàng
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin/reports"
            >
                <i className="bi bi-graph-up"></i> Báo Cáo
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? cl("nav-link", "bg-white text-dark fw-normal")
                        : cl("nav-link")
                }
                to="/admin/settings"
            >
                <i className="bi bi-gear"></i> Cài Đặt
            </NavLink>
        </div>
    );
};

export default SidebarAdmin;
