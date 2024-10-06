import React from "react";

interface IForm {
    children: React.ReactNode;
    onSubmit: any;
    background: string;
    backgroundForm: string;
    loading: boolean;
}

const Form = (props: IForm) => {
    const { children, onSubmit, background, backgroundForm } = props;
    return (
        <section
            className="vh-100"
            style={{
                background: `url(${background}) no-repeat center center`,
                backgroundSize: "cover",
            }}
        >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div
                            className="card border-0"
                            style={{
                                borderRadius: "1rem",
                            }}
                        >
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        className="w-100 h-100 img-fluid"
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "1rem 0 0 1rem",
                                        }}
                                        src={`${backgroundForm}`}
                                        alt="background/image"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form
                                            className="position-relative"
                                            onSubmit={onSubmit}
                                        >
                                            {props.loading && (
                                                <div
                                                    style={{
                                                        left: "50%",
                                                    }}
                                                    className="position-absolute top-50 translate-middle"
                                                >
                                                    <div
                                                        className="spinner-border"
                                                        role="status"
                                                    ></div>
                                                </div>
                                            )}
                                            <div
                                                className={`${
                                                    props.loading
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                {children}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form;
