import * as z from "zod";

const kb = 1024 * 1024;
const maxSizeImage = 10;
const maxFileImages = 6;

const maxSizeVideo = 30;
const maxFileVideo = 1;

export const ACCEPTED_IMAGE_TYPES = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
];

export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"];

const fileValidate = z.any().refine(
    (value) => {
        const isFileList = value instanceof FileList;
        if (!value || !isFileList || (isFileList && value.length === 0)) {
            return false;
        }
        return value as FileList;
    },
    { message: "Vui lòng chọn file" }
);

export const CreateProductSchema = z.object({
    productImageFiles: fileValidate
        .refine(
            (files) => {
                if (!(files instanceof FileList)) {
                    return false;
                }
                return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
            },
            {
                message: `Vui lòng chọn ảnh theo định dạng sau ${ACCEPTED_IMAGE_TYPES.join(
                    ", "
                )}.`,
            }
        )
        .refine(
            (files: FileList) => {
                if (!(files instanceof FileList)) {
                    return false;
                }

                return files[0]?.size < maxSizeImage * kb;
            },
            {
                message: `ảnh quá lớn kích thước tối đa ${maxSizeImage}MB.`,
            }
        )
        .refine(
            (files: FileList) => {
                if (!(files instanceof FileList)) {
                    return false;
                }
                return files.length <= maxFileImages;
            },
            {
                message: `Tối đa ${maxFileImages} ảnh.`,
            }
        ),
    video: fileValidate
        .refine(
            (files) => {
                if (!(files instanceof FileList)) {
                    return false;
                }
                return ACCEPTED_VIDEO_TYPES.includes(files[0]?.type);
            },
            {
                message: `Vui lòng chọn ảnh theo định dạng sau ${ACCEPTED_VIDEO_TYPES.join(
                    ", "
                )}.`,
            }
        )
        .refine(
            (files: FileList) => {
                if (!(files instanceof FileList)) {
                    return false;
                }

                return files[0]?.size < maxSizeVideo * kb;
            },
            {
                message: `Video quá lớn kích thước tối đa ${maxSizeVideo}MB.`,
            }
        )
        .refine(
            (files: FileList) => {
                if (!(files instanceof FileList)) {
                    return false;
                }
                return files.length <= maxFileVideo;
            },
            {
                message: `Tối đa ${maxFileVideo} video.`,
            }
        ),
    name: z.string().min(2, {
        message: "Ít nhất 2 ký tự",
    }),
    category: z.string().min(4, {
        message: "Ít nhất 4 ký tự",
    }),
    description: z.string().min(100, {
        message: "Ít nhất 100 ký tự",
    }),
    productType: z
        .array(
            z.object({
                name: z.string().min(2, {
                    message: "Vui lòng điền tên loại sản phẩm ít nhất 2 ký tự",
                }),
                price: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
                quantity: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
            })
        )
        .min(1, {
            message: "ít nhất phải có 1 loại sản phẩm",
        }),
    length: z.object({
        value: z.preprocess(
            (value) => (typeof value === "string" ? parseFloat(value) : value),
            z.number({ message: "Vui lòng điền đúng định dạng" })
        ),
        unit: z.string().min(1, {
            message: "Vui Lòng chọn đơn vị phù hợp",
        }),
    }),
    from: z.string().min(2, {
        message: "Vui Lòng điền sản phẩm đền từ đâu",
    }),
    offers: z
        .array(
            z.object({
                price_from: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
                price_to: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
                value: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
            })
        )
        .optional(),
    weight: z.string().min(1, {
        message: "Vui lòng điền trọng lượng: 1g, 2g, 1kg, 2kg ...",
    }),
    brand: z.string().min(1, {
        message: "Vui lòng chọn",
    }),
    colors: z
        .array(
            z.object({
                name: z.string().min(1, {
                    message: "không để trống",
                }),
                image: fileValidate
                    .refine(
                        (files) => {
                            if (!(files instanceof FileList)) return false;
                            return files.length === 1;
                        },
                        {
                            message: "Tối đa chỉ một ảnh",
                        }
                    )
                    .refine(
                        (files) => {
                            if (!(files instanceof FileList)) return false;
                            return ACCEPTED_IMAGE_TYPES.includes(
                                files[0]?.type
                            ); // Kiểm tra kiểu
                        },
                        {
                            message: `Vui lòng chọn ảnh theo định dạng sau ${ACCEPTED_IMAGE_TYPES.join(
                                ", "
                            )}.`,
                        }
                    )
                    .refine(
                        (files) => {
                            if (!(files instanceof FileList)) return false;
                            return files[0]?.size < maxSizeImage * kb;
                        },
                        {
                            message: `Ảnh quá lớn kích thước tối đa ${maxSizeImage}MB.`,
                        }
                    ),
            })
        )
        .optional(),
});

export const EditproductSchema = z.object({
    name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
    description: z.string().min(100, {
        message: "Ít nhất một trăm ký tự",
    }),
    weight: z.string().min(1, {
        message: "không được để trống",
    }),
    category: z.string().min(1, {
        message: "Không được để trống",
    }),
    from: z.string().min(1, {
        message: "không được để trống",
    }),
    productType: z
        .array(
            z.object({
                name: z.string().min(1, "Tên loại là bắt buộc"),
                price: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
                quantity: z.preprocess(
                    (value) =>
                        typeof value === "string" ? parseFloat(value) : value,
                    z.number({ message: "Vui lòng điền đúng định dạng" })
                ),
            })
        )
        .nonempty("Phải có ít nhất một loại sản phẩm"),
    length: z.object({
        value: z.preprocess(
            (value) => (typeof value === "string" ? parseFloat(value) : value),
            z.number({ message: "Vui lòng điền đúng định dạng" })
        ),
        unit: z.enum(["cm", "m"], {
            errorMap: () => ({ message: "Đơn vị phải là cm hoặc m" }),
        }),
    }),
});
