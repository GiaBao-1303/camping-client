import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../configs";
import { IUser } from "../interfaces";

export const addDocument = async (collectionName: string, data: IUser) => {
    try {
        const docRef = doc(db, collectionName, data._id);
        await setDoc(docRef, data);
    } catch (error) {
        console.error(error);
    }
};

export const getUserByEmail = async (collectionName: string, email: string) => {
    try {
        const q = query(
            collection(db, collectionName),
            where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
};

export const getUserById = async (collectionName: string, id: string) => {
    try {
        const q = query(collection(db, collectionName), where("_id", "==", id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as IUser;

        return userData;
    } catch (error) {
        console.error(error);
    }
};
