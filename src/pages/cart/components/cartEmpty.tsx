const CartEmpty = () => {
    return (
        <div className="d-flex flex-column align-items-center">
            <div
                style={{
                    background:
                        "url(https://res.cloudinary.com/dbtqtvo9l/image/upload/v1728098541/cart-empty_jw56jo.png) no-repeat center center",
                    width: "108px",
                    height: "180px",
                    backgroundSize: "cover",
                }}
            ></div>
            <h6
                style={{
                    color: "rgba(0,0,0,.4)",
                }}
            >
                Giỏ hàng của bạn còn trống
            </h6>

            <a
                href="/"
                style={{
                    background: "#ee4d2d",
                }}
                className="btn text-white py-2 px-4 rounded-0 mt-2"
            >
                MUA NGAY
            </a>
        </div>
    );
};

export default CartEmpty;
