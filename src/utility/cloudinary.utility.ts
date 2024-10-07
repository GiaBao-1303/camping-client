import axios, { AxiosProgressEvent } from "axios";
import { v4 as genuid } from "uuid";

export const FileUpload = async (
    file: File,
    folder?: string,
    callback?: (progressEvent: AxiosProgressEvent) => void
) => {
    try {
        const upload_preset = process.env.REACT_APP_CLOUDINARY_PRESET_NAME;
        if (!upload_preset) throw new Error("upload_present not available");

        const cloud_name = process.env.REACT_APP_CLOUDINARY_NAME;
        if (!cloud_name) throw new Error("cloud_name not available");

        const publicId = genuid();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);
        formData.append("public_id", publicId);

        if (file.type.startsWith("video/")) {
            formData.append("folder", "shop-Camping/productVideos");
        } else if (folder) {
            formData.append("folder", `shop-Camping/${folder}`);
        }
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
            formData,
            {
                onUploadProgress: callback,
            }
        );

        const fileUrl = res.data.secure_url || res.data.url;

        return {
            url: fileUrl,
            _id: publicId,
        };
    } catch (err) {
        console.error(err);
    }
};

export const FileDelete = async (_id: string) => {
    try {
        const cloud_name = process.env.REACT_APP_CLOUDINARY_NAME;
        const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;

        await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/destroy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                public_id: _id,
                api_key: apiKey,
            }),
        });
    } catch (error) {
        console.error("Delete failed:", error);
    }
};
