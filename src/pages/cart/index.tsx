import { useEffect, useState } from "react";
import CartEmpty from "./components/cartEmpty";
import { IUser } from "../../interfaces";
import { getUserById } from "../../queries";
import HeaderCart from "./components/HeaderCart";
import FormCart from "./components/formCart";
import { getSession } from "../../utility/cookie.utility";

const CartPage = () => {
    const _id = getSession("_id");

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        setLoading(true);
        getUserById("users", _id)
            .then((res) => {
                if (!res) {
                    setUser(null);
                    return;
                } else {
                    setUser(res);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div
            style={{
                background:
                    "linear-gradient(to right, #f5f5f5 0%, #f5f5f5 100%)",
            }}
            className="min-vh-100"
        >
            <div
                className="bg-white"
                style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .09)",
                }}
            >
                <div className="container">
                    <header
                        style={{
                            height: "100px",
                        }}
                        className="d-flex align-items-center"
                    >
                        <div className="d-flex align-items-center">
                            <a href="/">
                                <img
                                    width={130}
                                    src="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727950502/logo_relaxviet_xi5uzi.webp"
                                    alt="images/login"
                                />
                            </a>
                            <div
                                style={{
                                    color: "#ee4d2d",
                                    borderLeft: "1px solid #ee4d2d",
                                    paddingLeft: "15px",
                                    marginLeft: "15px",
                                }}
                                className="fs-5 fw-normal"
                            >
                                Giỏ Hàng
                            </div>
                        </div>
                    </header>
                </div>
            </div>
            <div className="container">
                {user?.carts.length === 0 ? (
                    <div
                        style={{
                            height: "21rem",
                        }}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <CartEmpty />
                    </div>
                ) : (
                    <>
                        <HeaderCart />
                        <FormCart>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </FormCart>
                    </>
                )}

                <div>
                    <h4>Bạn có thể thích</h4>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
