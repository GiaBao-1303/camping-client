import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs";
import { ICart } from "../interfaces";

export const getAllCarts = async () => {
    try {
        const docs = (await getDocs(collection(db, "carts"))).docs as ICart[];
        return docs;
    } catch (error) {
        console.error(error);
    }
};

export const getCartById = async (id: string) => {
    try {
        const q = query(collection(db, "carts"), where("_id", "==", id));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
};
