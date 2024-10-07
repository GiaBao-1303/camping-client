import classNames from "classnames/bind";
import styles from "./AdminHeader.module.css";

const cl = classNames.bind(styles);

const AdminHeader = () => {
    return (
        <div className={cl("header")}>
            <div>
                <img
                    width={200}
                    height={42}
                    src="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727950502/logo_relaxviet_xi5uzi.webp"
                    alt="images/logo"
                />
            </div>
            <div className="d-flex align-items-center">
                <button
                    className={cl("admin-header", "text-white", "btn-custom")}
                >
                    <i className="bi bi-bell"></i>
                    <span>Thông báo</span>
                </button>

                <button
                    className={cl("admin-header", "text-white", "btn-custom")}
                >
                    <i className="bi bi-globe"></i>
                    <span>Hỗ trợ</span>
                </button>

                <button
                    className={cl("admin-header", "text-white", "btn-custom")}
                >
                    <i className="bi bi-globe"></i>
                    <span>Tiếng việt</span>
                </button>

                <button className={cl("admin-header")}>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Admin Avatar"
                        className={cl("admin-avatar")}
                    />
                </button>
            </div>
        </div>
    );
};

export default AdminHeader;
