import { v4 as genuid } from "uuid";
import { db } from "../configs";
import { CreateProductData } from "../types/form";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { FileDelete, FileUpload } from "../utility/cloudinary.utility";
import { AxiosProgressEvent } from "axios";
import { IProduct } from "../interfaces/product.interface";

export const CreateProductDb = async (
    data: CreateProductData,
    onProgress?: (progress: number) => void
) => {
    try {
        const _id = genuid();

        const promiseUploads = [];
        const productImageFiles = data.productImageFiles;
        const colorsImageFiles = data.colors || [];
        const totalFiles =
            productImageFiles.length + colorsImageFiles.length + 1;

        let totalSize = data.video[0].size;
        let totalPressSize = 0;

        for (let i = 0; i < productImageFiles.length; i++) {
            totalSize += productImageFiles[i].size;
        }

        for (let i = 0; i < colorsImageFiles.length; i++) {
            totalSize += colorsImageFiles[i].image[0].size;
        }

        const handleCalcProgress = (progress: AxiosProgressEvent) => {
            totalPressSize += progress.loaded;

            if (onProgress) {
                onProgress(Math.round(totalPressSize / totalSize));
            }
        };

        for (let i = 0; i < productImageFiles.length; i++) {
            promiseUploads.push(
                FileUpload(productImageFiles[i], "productImage", (progress) => {
                    handleCalcProgress(progress);
                })
            );
        }

        for (let i = 0; i < colorsImageFiles.length; i++) {
            promiseUploads.push(
                FileUpload(
                    colorsImageFiles[i].image[0],
                    "productImage",
                    (progress) => {
                        handleCalcProgress(progress);
                    }
                )
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

        const images = uploadeds.slice(0, productImageFiles.length);
        const imageColors = uploadeds.slice(
            productImageFiles.length,
            productImageFiles.length + colorsImageFiles.length
        );
        const video = uploadeds[uploadeds.length - 1];

        const colors =
            data.colors?.map((color, ix) => {
                return {
                    name: color.name,
                    _id: imageColors[ix]?._id,
                    url: imageColors[ix]?.url,
                };
            }) || [];

        if (uploadeds.length === totalFiles) {
            const docData = {
                _id,
                ...data,
                productImageFiles: images,
                colors,
                video,
                createdAt: Date.now(),
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

export const getAllProduct = async () => {
    try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => {
            return doc.data() as IProduct;
        });
        return docs;
    } catch (err) {
        console.error(err);
    }
};

export const getProductById = async (_id: string) => {
    try {
        const q = query(collection(db, "products"), where("_id", "==", _id));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs[0].data() as IProduct;
        return docs;
    } catch (err) {
        console.error(err);
    }
};

export const removeProductById = async (_id: string) => {
    try {
        const product = await getProductById(_id);
        if (product) {
            const files = [
                ...product.productImageFiles,
                ...(product.colors || []),
            ];

            await Promise.all([
                ...files.map((file) => FileDelete(file, "productImage")),
                FileDelete(product.video, "productVideos"),
            ]);

            const docRef = doc(db, "products", product._id);
            await deleteDoc(docRef);
        }
    } catch (err) {
        console.error(err);
    }
};
