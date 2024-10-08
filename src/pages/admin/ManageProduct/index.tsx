import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Button, Table } from "react-bootstrap";
import styles from "../css/ManagerProduct.module.css";
import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";
import { getAllProduct, removeProductById } from "../../../queries";
import { LoadingNormal } from "../../../components";

const cl = classNames.bind(styles);

const ManageProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllProduct()
            .then((res) => {
                setProducts(res || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveProduct = async (_id: string) => {
        try {
            setLoadingRemove(true);
            await removeProductById(_id);
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingRemove(false);
        }
    };

    return (
        <React.Fragment>
            <div className={cl("content", "position-relative")}>
                <div className={cl("header", "mb-4")}>
                    <h3 className="m-0">Quản Lý Sản Phẩm</h3>
                    <Link to="create" className={cl("btn-custom", "btn")}>
                        <i className="bi bi-plus"></i> Thêm Sản Phẩm
                    </Link>
                </div>
                {loading && (
                    <div className={cl("position-loading")}>
                        <LoadingNormal colors="primary" />
                    </div>
                )}

                {loadingRemove && (
                    <div className={cl("custom-loading-remove")}>
                        <div>
                            <div
                                style={{
                                    borderColor: "#fa5130",
                                    borderRightColor: "wheat",
                                }}
                                className="spinner-border"
                                role="status"
                            ></div>
                        </div>
                        <span>Đang xóa sản phẩm</span>
                    </div>
                )}

                <Table striped bordered className={cl("table")}>
                    <thead className={cl("thead-dark")}>
                        <tr>
                            <th>ID</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Nghành hàng</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => {
                            let minPrice = item.productType[0].price;
                            let maxPrice = item.productType[0].price;
                            item.productType.forEach((prodType) => {
                                minPrice = Math.min(minPrice, prodType.price);
                                maxPrice = Math.max(maxPrice, prodType.price);
                            });

                            const priceText =
                                minPrice === maxPrice
                                    ? `${minPrice} Vnd`
                                    : `${minPrice} - ${maxPrice} Vnd`;

                            return (
                                <tr key={item._id}>
                                    <td className={cl("text-ellipsis")}>
                                        {item._id}
                                    </td>
                                    <td className={cl("text-ellipsis")}>
                                        {item.name}
                                    </td>
                                    <td className={cl("text-ellipsis")}>
                                        {priceText}
                                    </td>
                                    <td className={cl("text-ellipsis")}>
                                        {item.category}
                                    </td>
                                    <td
                                        className={cl(
                                            "d-flex",
                                            "justify-content-center"
                                        )}
                                    >
                                        <Button variant="warning" size="sm">
                                            <i className="bi bi-pencil"></i> Sửa
                                        </Button>
                                        <Button
                                            className={cl("mx-4")}
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveProduct(item._id)
                                            }
                                        >
                                            <i className="bi bi-trash"></i> Xóa
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
};

export default ManageProduct;
