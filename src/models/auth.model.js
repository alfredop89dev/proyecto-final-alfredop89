import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/db.js";

const usersCollection = collection(db, "users");

export const getUserByUsername = async (username) => {
    const q = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
}

