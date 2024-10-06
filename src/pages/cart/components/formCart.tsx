import classNames from "classnames/bind";
import styles from "../css/formCart.module.css";

const cl = classNames.bind(styles);

interface IFormCart {
    children: React.ReactNode;
}

const FormCart = (props: IFormCart) => {
    return (
        <div>
            <div
                style={{
                    height: "55px",
                }}
                className={cl("grid-container")}
            >
                {props.children}
            </div>
        </div>
    );
};

export default FormCart;
