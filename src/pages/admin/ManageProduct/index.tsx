import React from "react";
import classNames from "classnames/bind";
import { Button, Table } from "react-bootstrap";
import styles from "../css/ManagerProduct.module.css";
import { Link } from "react-router-dom";

const cl = classNames.bind(styles);

const ManageProduct = () => {
    return (
        <React.Fragment>
            <div className={cl("content")}>
                <div className={cl("header", "mb-4")}>
                    <h3 className="m-0">Quản Lý Sản Phẩm</h3>
                    <Link to="create" className={cl("btn-custom", "btn")}>
                        <i className="bi bi-plus"></i> Thêm Sản Phẩm
                    </Link>
                </div>
                <Table striped bordered className={cl("table")}>
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Mô Tả</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Sản Phẩm A</td>
                            <td>100.000 VNĐ</td>
                            <td>Mô tả chi tiết về sản phẩm A.</td>
                            <td>
                                <Button variant="warning" size="sm">
                                    <i className="bi bi-pencil"></i> Sửa
                                </Button>
                                <Button variant="danger" size="sm">
                                    <i className="bi bi-trash"></i> Xóa
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Sản Phẩm B</td>
                            <td>200.000 VNĐ</td>
                            <td>Mô tả chi tiết về sản phẩm B.</td>
                            <td>
                                <Button variant="warning" size="sm">
                                    <i className="bi bi-pencil"></i> Sửa
                                </Button>
                                <Button variant="danger" size="sm">
                                    <i className="bi bi-trash"></i> Xóa
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    );
};

export default ManageProduct;
