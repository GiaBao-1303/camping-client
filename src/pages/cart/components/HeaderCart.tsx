import CheckBox from "../../../components/form/checkbox";

const HeaderCart = () => {
    return (
        <div
            className="bg-white mt-4"
            style={{
                userSelect: "none",
            }}
        >
            <div
                style={{
                    height: "55px",
                }}
                className="d-flex align-items-center"
            >
                <div
                    style={{
                        width: "15%",
                        paddingLeft: "24px",
                    }}
                    className="flex-grow-1"
                >
                    <CheckBox id="checkAll" name="checkall">
                        <label
                            className="form-check-label"
                            htmlFor={"checkAll"}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            Sản phẩm
                        </label>
                    </CheckBox>
                </div>

                <div
                    style={{
                        width: "15%",
                    }}
                    className="text-center"
                >
                    Đơn giá
                </div>

                <div
                    style={{
                        width: "15%",
                    }}
                    className="text-center"
                >
                    Số lượng
                </div>

                <div
                    style={{
                        width: "15%",
                    }}
                    className="text-center"
                >
                    Số tiền
                </div>

                <div
                    style={{
                        width: "15%",
                    }}
                    className="text-center"
                >
                    Thao Tác
                </div>
            </div>
        </div>
    );
};

export default HeaderCart;
