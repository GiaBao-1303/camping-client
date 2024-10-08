import axios, { AxiosProgressEvent } from "axios";
import { v4 as genuid } from "uuid";
import cloudinary from "../configs/cloudinary.config";

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

export const FileDelete = async (
    file: { _id: string; url: string },
    prefix?: string
) => {
    try {
        const resourceType = file.url.endsWith(".mp4") ? "video" : "image";

        const res = await cloudinary.v2.uploader.destroy(
            `shop-Camping/${prefix}/${file._id}`,
            {
                resource_type: resourceType,
            }
        );
        console.log(res.result);
    } catch (error) {
        console.error("Delete failed:", error);
    }
};
