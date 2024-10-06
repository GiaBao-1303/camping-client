const LoadingNormal = () => {
    return (
        <div
            style={{
                left: "50%",
            }}
            className="position-absolute top-50 translate-middle"
        >
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default LoadingNormal;
