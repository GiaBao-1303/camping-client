import styles from "./404.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { NotFoundBackground } from "../../assets";
import { BackgroundNotFound } from "../../assets/images";

const cl = classNames.bind(styles);

const NotFound = () => {
    return (
        <div
            className={cl(
                "d-flex justify-content-center align-items-center position-relative",
                "wrapper"
            )}
        >
            <div
                className={cl(
                    "position-absolute top-0 left-0 right-0 bottom-0 z-0 w-100 h-100"
                )}
            >
                <img
                    className={cl("w-100 h-100")}
                    src={BackgroundNotFound}
                    alt="Image/NotFound"
                />
            </div>
            <div
                className={cl(
                    "container d-flex flex-column justify-content-center align-items-center position-relative z-1"
                )}
            >
                <img
                    width="65%"
                    alt="NotFound/background"
                    src={NotFoundBackground}
                />
                <div className={cl("mt-4 text-white")}>
                    <h1>Không tìm thấy trang</h1>
                </div>

                <div className={cl("mt-4")}>
                    <Link
                        className={cl("btn btn-secondary text-decoration-none")}
                        to="/"
                    >
                        Trở về trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
