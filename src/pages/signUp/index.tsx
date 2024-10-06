import { useForm } from "react-hook-form";
import { FormSignUpData } from "../../types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../../components";
import { Link } from "react-router-dom";
import { SignUpSchema } from "../../schemas";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { IUser } from "../../interfaces";
import { v4 as genuid } from "uuid";
import { addDocument, getUserByEmail } from "../../queries/user.query";
import { setSession } from "../../utility/cookie.utility";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignUpData>({
        resolver: zodResolver(SignUpSchema),
    });

    const [isExistingEmail, setIsExistingEmail] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormSignUpData) => {
        try {
            isExistingEmail && setIsExistingEmail(false);
            setLoading(true);
            const profile = await getUserByEmail("users", data.email);

            if (!profile?.empty) {
                setIsExistingEmail(true);
                return;
            }

            const _id = genuid();

            const user: IUser = {
                email: data.email,
                _id: _id,
                name: data.name,
                password: data.password,
                carts: [],
                orders: [],
                role: "user",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            await addDocument("users", user);

            setSession("_id", _id);

            window.location.href = "/";
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="position-relative">
            <Form
                background="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258313/form-banner-signup-bg_cuz6mt.jpg"
                backgroundForm="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258313/form-banner-signup_slzqp7.jpg"
                onSubmit={handleSubmit(onSubmit)}
                loading={loading}
            >
                <h5
                    className="text-center mb-3 pb-3"
                    style={{
                        letterSpacing: "1px",
                    }}
                >
                    Đăng Ký
                </h5>

                <div className="form-outline mb-4">
                    <FormField
                        disabled={loading}
                        type="text"
                        className="form-control form-control-lg"
                        error={errors.name}
                        name="name"
                        register={register}
                        placeholder="Họ Và Tên"
                    />
                </div>

                <div className="form-outline mb-4">
                    <FormField
                        disabled={loading}
                        type="text"
                        className="form-control form-control-lg"
                        error={errors.email}
                        name="email"
                        register={register}
                        placeholder="Email"
                    />
                    {isExistingEmail && (
                        <span className="my-2 d-block text-danger">
                            Email Đã tồn tại
                        </span>
                    )}
                </div>

                <div className="form-outline mb-4">
                    <FormField
                        disabled={loading}
                        type="password"
                        className="form-control form-control-lg"
                        error={errors.password}
                        name="password"
                        register={register}
                        placeholder="Mật khẩu"
                    />
                </div>

                <div className="form-outline mb-4">
                    <FormField
                        disabled={loading}
                        type="password"
                        className="form-control form-control-lg"
                        error={errors.passwordConfirm}
                        name="passwordConfirm"
                        register={register}
                        placeholder="Nhập lại mật khẩu"
                    />
                </div>

                <div className="pt-1 mb-4">
                    <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                        disabled={loading}
                    >
                        Đăng Ký
                    </button>
                </div>

                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Đã có tài khoản?
                    <Link to="/sign-in" style={{ color: "#393f81" }}>
                        Đăng Nhập
                    </Link>
                </p>
                <Link to="" className="small text-muted">
                    Điều khoản sử dụng.
                </Link>
                <Link to="#!" className="small text-muted">
                    Chính sách bảo mật
                </Link>
            </Form>
        </div>
    );
};

export default SignUp;
