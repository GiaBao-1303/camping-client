import { v4 as genuid } from "uuid";
import { db } from "../configs";
import { CreateProductData } from "../types/form";
import { doc, setDoc } from "firebase/firestore";
import { FileUpload } from "../utility/cloudinary.utility";
import { AxiosProgressEvent } from "axios";

export const CreateProductDb = async (
    data: CreateProductData,
    onProgress?: (progress: number) => void
) => {
    try {
        const _id = genuid();

        const promiseUploads = [];
        const productImageFiles = data.productImageFiles;

        let totalSize = data.video[0].size;
        let totalPressSize = 0;

        for (let i = 0; i < productImageFiles.length; i++) {
            totalSize += productImageFiles[i].size;
        }

        const handleCalcProgress = (progress: AxiosProgressEvent) => {
            totalPressSize += Math.round((progress.loaded / totalSize) * 100);

            if (onProgress) {
                onProgress(totalPressSize);
            }
        };

        for (let i = 0; i < productImageFiles.length; i++) {
            promiseUploads.push(
                FileUpload(productImageFiles[i], "productImage", (progress) => {
                    handleCalcProgress(progress);
                })
            );
        }

        promiseUploads.push(
            FileUpload(data.video[0], "productVideos", (progress) => {
                const totalProgress = Math.round(
                    (progress.loaded / totalSize) * 100
                );

                if (onProgress) {
                    onProgress(totalProgress);
                }
            })
        );

        const uploadeds = await Promise.all(promiseUploads);

        console.log("Uploadeds: ", uploadeds);

        const images = uploadeds.slice(0, uploadeds.length - 1);
        const video = uploadeds[uploadeds.length - 1];

        if (uploadeds.length === productImageFiles.length + 1) {
            const docData = {
                _id,
                ...data,
                productImageFiles: images,
                video,
            };

            const docRef = doc(db, "products", _id);
            await setDoc(docRef, docData);
        } else {
            throw new Error("Upload failed");
        }
    } catch (error) {
        console.error(error);
    }
};
