interface ILoadingNormalProps {
    colors: "primary" | "secondary";
}

const LoadingNormal = (props: ILoadingNormalProps) => {
    return (
        <div
            style={{
                left: "50%",
            }}
            className="position-absolute top-50 translate-middle"
        >
            <div
                style={{
                    borderColor: `${props.colors === "primary" && "#fa5130"}`,
                    borderRightColor: "wheat",
                }}
                className="spinner-border"
                role="status"
            ></div>
        </div>
    );
};

export default LoadingNormal;
