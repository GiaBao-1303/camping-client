import * as z from "zod";

const SignInSchema = z.object({
    email: z.string().email({
        message: "Vui lòng điền một email hợp lệ",
    }),
    password: z.string().min(1, {
        message: "Vui lòng điền mật khẩu",
    }),
});

const SignUpSchema = z
    .object({
        name: z.string().min(1, {
            message: "Tên không được để trống",
        }),
        email: z.string().email({ message: "Email Không hợp lệ" }).min(1, {
            message: "Email không được để trống",
        }),
        password: z
            .string()
            .regex(
                new RegExp(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{1,}$/
                ),
                {
                    message:
                        "Mật khẩu phải có ít nhất một chữ thường, Chữ hoa, Ký tự đặc biệt",
                }
            )
            .min(8, {
                message: "Mật khẩu ít nhất phải 8 ký tự",
            })
            .max(16, {
                message: "Mật khẩu tối đã 16 ký tự",
            }),
        passwordConfirm: z.string().min(1, {
            message: "Vui lòng nhập lại mật khẩu",
        }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["passwordConfirm"],
    });

export { SignInSchema, SignUpSchema };
