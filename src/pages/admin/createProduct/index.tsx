import classNames from "classnames/bind";
import styles from "../css/CreateProduct.module.css";
import { Link } from "react-router-dom";
import FormField from "../../../components/form/formField";

const cl = classNames.bind(styles);

const CreateProduct = () => {
    return (
        <div>
            <div className="d-flex justify-content-end">
                <Link
                    to="/admin/products"
                    className={cl("btn text-white", "btn-custom")}
                >
                    <i className="bi bi-arrow-left"></i>
                    Trở về
                </Link>
            </div>
            <form>
                <h4>Thông tin cơ bản</h4>
                <div>
                    <div className={cl("grid-container")}>
                        <span>Hình ảnh sản phẩm</span>
                        <div>
                            <div>Hình ảnh</div>
                            <div>
                                {/* <FormField
                                    type="file"
                                    name="productImageFiles"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
