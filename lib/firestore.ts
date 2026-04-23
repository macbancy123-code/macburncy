import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageSrc: string;
  discoveryText?: string;
  inStock: boolean;
  category: string;
  isPromo: boolean;
  promoPrice?: number;
  createdAt?: any;
}

const PRODUCTS_COLLECTION = "products";

// Add a new product
export const addProduct = async (product: Omit<ProductData, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductData[];
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

// Get a single product
export const getProduct = async (id: string) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ProductData;
    }
    return null;
  } catch (error) {
    console.error("Error getting product: ", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, updates: Partial<ProductData>) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};
