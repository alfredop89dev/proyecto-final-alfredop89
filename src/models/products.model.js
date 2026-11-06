//Conectamos a la base de datos de firebase
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/db.js";

//Referencia a la colección de productos
const productsCollection = collection(db, "products");
const productRef = (id) => doc(db, "products", id);

//Funciónes
//Todos los productos
export const getAllProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

//Producto por ID
export const getProductById = async (id) => {
    const snapshot = await getDoc(productRef(id));
    if (!snapshot.exists()) {
        throw new Error("Producto no encontrado");
    }
    return { id: snapshot.id, ...snapshot.data() };
}

//Agregar un producto
export const addProduct = async (product) => {
    const newProduct = { ...product };
    const docRef = await addDoc(productsCollection, newProduct);
    return { id: docRef.id, ...newProduct };
}

//Actualizar un producto
export const updateProduct = async (id, updatedProduct) => {
    const ref = productRef(id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
        throw new Error("Producto no encontrado");
    }
    await updateDoc(ref, updatedProduct);
    return { id, ...snapshot.data(), ...updatedProduct };
}
//Eliminar un producto
export const deleteProduct = async (id) => {
    const ref = productRef(id);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
        throw new Error("Producto no encontrado");
    }
    await deleteDoc(ref);
    return { id, ...snapshot.data() };
}
