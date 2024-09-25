import { useForm } from "react-hook-form";
import { FormSignUpData } from "../../types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../../components";
import { Link } from "react-router-dom";
import { SignUpSchema } from "../../schemas";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignUpData>({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = async (data: FormSignUpData) => {
        console.log("Data: ", data);
    };

    return (
        <div>
            <Form
                background="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258313/form-banner-signup-bg_cuz6mt.jpg"
                backgroundForm="https://res.cloudinary.com/dbtqtvo9l/image/upload/v1727258313/form-banner-signup_slzqp7.jpg"
                onSubmit={handleSubmit(onSubmit)}
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

                <div className="form-outline mb-4">
                    <FormField
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
