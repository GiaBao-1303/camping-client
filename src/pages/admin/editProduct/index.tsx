import classNames from "classnames/bind";
import styles from "../css/editProduct.module.css";
import React, { FormEvent, useEffect, useState } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import { getProductById, updateProduct } from "../../../queries";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditproductSchema } from "../../../schemas/product.shema";
import { EditProductData } from "../../../types/form";

const cl = classNames.bind(styles);

const EditProduct = () => {
    const [product, setProduct] = useState<IProduct>();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProductData>({
        resolver: zodResolver(EditproductSchema),
    });

    const navigate = useNavigate();
    const { productId } = useParams();

    useEffect(() => {
        if (!productId) return navigate("/notfound");
        setIsLoading(true);
        getProductById(productId)
            .then((res) => {
                if (!res) return navigate("/notfound");
                setProduct(res);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmitForm = async (data: EditProductData) => {
        if (productId) {
            const dataEdited = {
                ...product,
                ...data,
            };

            await updateProduct(dataEdited, productId);

            navigate("/admin/products");
        }
    };

    return (
        <React.Fragment>
            {!isLoading && product && (
                <form
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className={cl("grid-container")}
                >
                    <div>
                        <div className={cl("form-group")}>
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                id="name"
                                defaultValue={product?.name}
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="mt-2 d-block text-danger">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className={cl("form-group")}>
                            <label htmlFor="description">Mô tả sản phẩm</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows={3}
                                defaultValue={product?.description}
                                {...register("description")}
                            ></textarea>
                            {errors.description && (
                                <span className="mt-2 d-block text-danger">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        <div className={cl("form-group")}>
                            <label htmlFor="weight">Trọng lượng</label>
                            <input
                                className={cl("form-control mt-2")}
                                id="weight"
                                defaultValue={product?.weight}
                                {...register("weight")}
                            />
                            {errors.weight && (
                                <span className="mt-2 d-block text-danger">
                                    {errors.weight.message}
                                </span>
                            )}
                        </div>

                        <div className={cl("form-group")}>
                            <label htmlFor="from">Sản phẩm đến từ</label>
                            <input
                                className={cl("form-control mt-2")}
                                id="from"
                                defaultValue={product.from}
                                {...register("from")}
                            />
                            {errors.from && (
                                <span className="mt-2 d-block text-danger">
                                    {errors.from.message}
                                </span>
                            )}
                        </div>

                        <div className={cl("form-group")}>
                            <label htmlFor="category">Danh mục sản phẩm</label>
                            <input
                                className={cl("form-control mt-2")}
                                id="category"
                                defaultValue={product.category}
                                {...register("category")}
                            />
                            {errors.from && (
                                <span className="mt-2 d-block text-danger">
                                    {errors.from.message}
                                </span>
                            )}
                        </div>

                        {product.productType.map((item, ix) => {
                            return (
                                <div
                                    key={ix}
                                    className={cl("form-group", "d-flex")}
                                >
                                    <div>
                                        <label
                                            htmlFor={`productType-${ix}-name`}
                                        >
                                            Tên loại
                                        </label>
                                        <input
                                            className={cl("form-control mt-2")}
                                            id={`productType-${ix}-name`}
                                            defaultValue={item.name}
                                            {...register(
                                                `productType.${ix}.name`
                                            )}
                                        />
                                        {errors.productType?.[ix]?.name && (
                                            <span className="mt-2 d-block text-danger">
                                                {
                                                    errors.productType[ix]?.name
                                                        ?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                    <div className="mx-4">
                                        <label
                                            htmlFor={`productType-${ix}-price`}
                                        >
                                            Giá
                                        </label>
                                        <input
                                            className={cl("form-control mt-2")}
                                            id={`productType-${ix}-price`}
                                            defaultValue={item.price}
                                            {...register(
                                                `productType.${ix}.price`
                                            )}
                                        />
                                        {errors.productType?.[ix]?.price && (
                                            <span className="mt-2 d-block text-danger">
                                                {
                                                    errors.productType[ix]
                                                        ?.price?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor={`productType-${ix}-quantity`}
                                        >
                                            Số lượng
                                        </label>
                                        <input
                                            className={cl("form-control mt-2")}
                                            id={`productType-${ix}-quantity`}
                                            defaultValue={item.quantity}
                                            {...register(
                                                `productType.${ix}.quantity`
                                            )}
                                        />
                                        {errors?.productType?.[ix]
                                            ?.quantity && (
                                            <span className="mt-2 d-block text-danger">
                                                {
                                                    errors?.productType[ix]
                                                        ?.quantity?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className={cl("form-group")}>
                            <label htmlFor="length">Độ dài</label>
                            <div className="d-flex align-items-center mt-2">
                                <input
                                    className={cl("form-control ")}
                                    id="length"
                                    defaultValue={product?.length.value}
                                    {...register("length.value")}
                                />
                                {errors.length?.value && (
                                    <span className="mt-2 d-block text-danger">
                                        {errors.length.value.message}
                                    </span>
                                )}
                                <select
                                    id="unit"
                                    className="form-control"
                                    style={{ width: "25%", marginLeft: "10px" }}
                                    {...register("length.unit")}
                                >
                                    <option
                                        selected={product.length.unit === "cm"}
                                        value={"cm"}
                                    >
                                        cm
                                    </option>
                                    <option
                                        selected={product.length.unit === "m"}
                                        value={"m"}
                                    >
                                        m
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div>
                            <h4>Ảnh sản phẩm</h4>
                            <div className="d-flex flex-wrap justify-content-around">
                                {product.productImageFiles.map((item, ix) => {
                                    return (
                                        <div
                                            key={ix}
                                            className="mx-2 my-2"
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "cover",
                                                border: "2px solid #fa5130",
                                            }}
                                        >
                                            <img
                                                width={"100%"}
                                                height={"100%"}
                                                src={item.url}
                                                alt=""
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {product.colors.length > 0 && (
                            <div className="mt-4">
                                <h4>Color</h4>
                                <div className="d-flex flex-wrap justify-content-around">
                                    {product.colors.map((item, ix) => {
                                        return (
                                            <div
                                                key={ix}
                                                className="mx-2 my-2"
                                                style={{
                                                    width: "150px",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                    border: "2px solid #fa5130",
                                                }}
                                            >
                                                <label className="my-2">
                                                    {item.name}
                                                </label>
                                                <img
                                                    width={"100%"}
                                                    height={"100%"}
                                                    src={item.url}
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <Link
                            to={"/admin/products"}
                            type="button"
                            className={cl("btn text-white", "btn-custom")}
                        >
                            Hủy bỏ
                        </Link>
                        <button
                            type="submit"
                            className={cl("btn text-white mx-4", "btn-custom")}
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            )}
        </React.Fragment>
    );
};

export default EditProduct;
