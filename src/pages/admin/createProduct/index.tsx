import classNames from "classnames/bind";
import styles from "../css/CreateProduct.module.css";
import { Link } from "react-router-dom";
import FormField from "../../../components/form/formField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductData } from "../../../types/form";
import { CreateProductSchema } from "../../../schemas/product.shema";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const cl = classNames.bind(styles);

const CreateProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductData>({
        resolver: zodResolver(CreateProductSchema),
    });
    const [imageCount, setImageCount] = useState<number>(0);
    const [videoCount, setVideoCount] = useState<number>(0);

    const [productTypes, setProductTypes] = useState<Array<number>>([0]);
    const [offers, setOffers] = useState<Array<number>>([]);

    const handleSubmitForm = (data: any) => {
        console.log(data);
    };

    const handleChangeImage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setImageCount(e.currentTarget.files?.length || 0);
        },
        []
    );

    const handleChangeVideo = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setVideoCount(e.currentTarget.files?.length || 0);
        },
        []
    );

    const handleAddProductType = () => {
        setProductTypes((prev) => [...prev, prev.length + 1]);
    };

    const handleAddOffer = () => {
        setOffers((prev) => [...prev, prev.length + 1]);
    };

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
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <h4>Thông tin cơ bản</h4>
                <div>
                    <div className={cl("grid-container")}>
                        <span>Hình ảnh sản phẩm</span>
                        <div>
                            <div>Hình ảnh</div>
                            <div>
                                <FormField
                                    type="file"
                                    name="productImageFiles"
                                    onChange={handleChangeImage}
                                    error={errors.productImageFiles}
                                    register={register}
                                    className="d-none"
                                    attrs={{
                                        multiple: true,
                                    }}
                                    id="imageProducs"
                                />
                                <label
                                    className={cl("custom-input-file")}
                                    htmlFor="imageProducs"
                                >
                                    <i className="bi bi-file-earmark-plus"></i>
                                    <div>Thêm hình ảnh ({imageCount}/6)</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cl("grid-container")}>
                        <span>Video sản phẩm</span>
                        <div className="d-flex align-items-center">
                            <div>
                                <FormField
                                    type="file"
                                    name="video"
                                    error={errors.video}
                                    register={register}
                                    onChange={handleChangeVideo}
                                    className="d-none"
                                    attrs={{
                                        multiple: true,
                                    }}
                                    id="videoProduct"
                                />
                                <label
                                    className={cl("custom-input-file")}
                                    htmlFor="videoProduct"
                                >
                                    <i className="bi bi-file-earmark-plus"></i>
                                    <div>Thêm Video ({videoCount}/1)</div>
                                </label>
                            </div>
                            <div
                                style={{
                                    fontSize: "14px",
                                }}
                                className="mx-4"
                            >
                                <div>* Định dạng MP4</div>
                                <div>* Độ dài video ngắn khoảng 1 phút</div>
                                <div>* Kích thước tối đa 30MB</div>
                            </div>
                        </div>
                    </div>
                    <div className={cl("grid-container")}>
                        <span>Tên Sản phẩm</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <FormField
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Tên sản phẩm"
                                    error={errors.name}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <span>Ngành hàng</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <FormField
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    placeholder="Ngành hàng ..."
                                    error={errors.category}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <span>Mô tả sản phẩm</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <textarea
                                    {...register("description")}
                                    name="description"
                                    className="form-control"
                                    rows={6}
                                ></textarea>
                                {errors.description && (
                                    <span className="mt-2 d-block text-danger">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <h4>Thông tin chi tiết</h4>
                <div>
                    <div className={cl("grid-container")}>
                        <span>Chiều dài</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100 d-flex">
                                <div>
                                    <FormField
                                        type="text"
                                        name="length.value"
                                        className="form-control"
                                        placeholder="Vui lòng điền vào"
                                        error={errors.length?.value}
                                        register={register}
                                    />
                                </div>
                                <div
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    <select
                                        {...register("length.unit")}
                                        style={{
                                            width: "100px",
                                        }}
                                        className="form-select"
                                    >
                                        <option selected value="m">
                                            m
                                        </option>
                                        <option value="cm">cm</option>
                                    </select>
                                    {errors.length?.unit && (
                                        <span className="mt-2 d-block text-danger">
                                            {errors.length.unit.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <span>Xuất xứ</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <FormField
                                    type="text"
                                    name="from"
                                    className="form-control"
                                    placeholder="Điền Xuất xứ đơn hàng"
                                    error={errors.from}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <span>Thương hiệu</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <FormField
                                    type="text"
                                    name="brand"
                                    className="form-control"
                                    placeholder="Vui lòng chọn"
                                    error={errors.brand}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <span>Cân nặng</span>
                        <div className="d-flex align-items-center">
                            <div className="form-group w-100">
                                <FormField
                                    type="text"
                                    name="weight"
                                    className="form-control"
                                    placeholder="Điền Địa chỉ hàng"
                                    error={errors.weight}
                                    register={register}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cl("grid-container")}>
                        <div
                            style={{
                                marginTop: "20px",
                            }}
                        >
                            Loại sản phẩm
                        </div>
                        <div>
                            {productTypes.map((elem, ix) => {
                                return (
                                    <div
                                        key={ix}
                                        className={cl(
                                            "d-flex align-items-center",
                                            "productTypes"
                                        )}
                                        style={{
                                            background:
                                                "linear-gradient(to right, rgb(255 204 194) 0%, rgb(255 255 255) 100%)",
                                        }}
                                    >
                                        <div className="form-group w-100">
                                            <div>
                                                <input
                                                    {...register(
                                                        `productType.${elem}.name`
                                                    )}
                                                    type="text"
                                                    placeholder="Tên loại"
                                                    className="form-control"
                                                />
                                                {errors.productType?.[elem]
                                                    ?.name && (
                                                    <span className="mt-2 d-block text-danger">
                                                        {
                                                            errors
                                                                .productType?.[
                                                                elem
                                                            ]?.name?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="my-4">
                                                <input
                                                    {...register(
                                                        `productType.${elem}.price`
                                                    )}
                                                    type="number"
                                                    placeholder="Giá"
                                                    className="form-control"
                                                />
                                                {errors.productType?.[elem]
                                                    ?.price && (
                                                    <span className="mt-2 d-block text-danger">
                                                        {
                                                            errors
                                                                .productType?.[
                                                                elem
                                                            ]?.price?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <input
                                                    {...register(
                                                        `productType.${elem}.quantity`
                                                    )}
                                                    type="number"
                                                    placeholder="Số lượng"
                                                    className="form-control"
                                                />
                                                {errors.productType?.[elem]
                                                    ?.quantity && (
                                                    <span className="mt-2 d-block text-danger">
                                                        {
                                                            errors
                                                                .productType?.[
                                                                elem
                                                            ]?.quantity?.message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {offers.length > 0 && (
                    <>
                        <h4>Mã giảm giá</h4>
                        <div>
                            {offers.map((elem, ix) => {
                                return (
                                    <div
                                        key={elem}
                                        className={cl("grid-container")}
                                    >
                                        <div
                                            style={{
                                                marginTop: "20px",
                                            }}
                                        >
                                            <div>Mã {elem}</div>
                                        </div>
                                        <div className="d-flex">
                                            <div>
                                                <label>Từ Giá (Sản phẩm)</label>

                                                <FormField
                                                    type="text"
                                                    name={`offers.${ix}.price_from`}
                                                    className="form-control"
                                                    error={
                                                        errors.offers?.[ix]
                                                            ?.price_from
                                                    }
                                                    register={register}
                                                />
                                            </div>

                                            <div className="mx-4">
                                                <label>
                                                    Đến Giá (Sản phẩm)
                                                </label>
                                                <FormField
                                                    type="text"
                                                    name={`offers.${ix}.price_to`}
                                                    className="form-control"
                                                    error={
                                                        errors.offers?.[ix]
                                                            ?.price_to
                                                    }
                                                    register={register}
                                                />
                                            </div>

                                            <div>
                                                <label>
                                                    Áp dụng (Sản phẩm)
                                                </label>
                                                <FormField
                                                    type="text"
                                                    name={`offers.${ix}.value`}
                                                    className="form-control"
                                                    error={
                                                        errors.offers?.[ix]
                                                            ?.value
                                                    }
                                                    register={register}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <button
                            onClick={handleAddProductType}
                            type="button"
                            className={cl("btn text-white", "btn-custom")}
                        >
                            <i className="bi bi-plus-lg"></i>
                            Thêm phân loại
                        </button>
                        <button
                            type="button"
                            onClick={handleAddOffer}
                            className={cl("btn text-white mx-4", "btn-custom")}
                        >
                            <i className="bi bi-gift"></i>
                            Tạo mã giảm giá
                        </button>
                    </div>

                    <button
                        style={{
                            marginLeft: "35px",
                        }}
                        type="submit"
                        className={cl("btn text-white", "btn-custom")}
                    >
                        <i className="bi bi-plus-square-fill"></i>
                        Tạo sản phẩm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
