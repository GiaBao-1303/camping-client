import classNames from "classnames/bind";
import styles from "./checkbox.module.css";
import React from "react";

const cl = classNames.bind(styles);

interface ICheckBoxProps {
    children: React.ReactNode;
    name: string;
    id: string;
    value?: string;
}

const CheckBox = (props: ICheckBoxProps) => {
    return (
        <div
            className={cl(
                "form-check p-0 d-flex align-items-center",
                "checkbox-container"
            )}
        >
            <input
                name={props.name}
                type="checkbox"
                value={props.value}
                id={props.id}
                className={cl("d-none", "check")}
            />
            <label
                className={cl("custom-checkbox")}
                htmlFor={props.id}
                style={{
                    cursor: "pointer",
                }}
            ></label>
            {props.children}
        </div>
    );
};

export default CheckBox;
