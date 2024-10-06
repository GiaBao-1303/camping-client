import { useForm } from "react-hook-form";
import { FormSignInData } from "../../types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../schemas";
import { Form, FormField } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserByEmail } from "../../queries/user.query";
import { IUser } from "../../interfaces";
import { setSession } from "../../utility/cookie.utility";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignInData>({
        resolver: zodResolver(SignInSchema),
    });

    const [isEmailOrPassCorrect, setIsEmailOrPassCorrect] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormSignInData) => {
        try {
            setLoading(true);
            isEmailOrPassCorrect && setIsEmailOrPassCorrect(false);

            const res = await getUserByEmail("users", data.email);

            if (!res || res.empty) return setIsEmailOrPassCorrect(true);

            const userData = res.docs[0].data() as IUser;

            if (userData.password !== data.password)
                return setIsEmailOrPassCorrect(true);

            setSession("_id", userData._id);

            navigate("/");
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form
                background="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258278/form-banner-signin-bg_mkaasv.jpg"
                backgroundForm="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258277/form-banner-signIn_uwyg8v.jpg"
                onSubmit={handleSubmit(onSubmit)}
                loading={loading}
            >
                <h5
                    className="text-center mb-3 pb-3"
                    style={{
                        letterSpacing: "1px",
                    }}
                >
                    Đăng Nhập
                </h5>
                <div className="form-outline mb-4">
                    <FormField
                        type="text"
                        className="form-control form-control-lg"
                        error={errors.email}
                        name="email"
                        register={register}
                        placeholder="Email"
                    />
                </div>

                <div className="form-outline mb-4">
                    <FormField
                        type="password"
                        className="form-control form-control-lg"
                        error={errors.password}
                        name="password"
                        register={register}
                        placeholder="Mật khẩu"
                    />
                </div>
                {isEmailOrPassCorrect && (
                    <div className="form-outline mb-4">
                        <span className="mt-2 d-block text-danger">
                            Email hoặc mật khẩu không chính xác
                        </span>
                    </div>
                )}

                <div className="pt-1 mb-4">
                    <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                    >
                        Đăng Nhập
                    </button>
                </div>

                <a className="small text-muted" href="#!">
                    Quên mật khẩu?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Chưa có tài khoản?
                    <Link to="/sign-up" style={{ color: "#393f81" }}>
                        Đăng ký
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

export default SignIn;
