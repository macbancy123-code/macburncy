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
import { uploadToCloudinary } from "./cloudinary-upload";

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
  imageStoragePath?: string; // Track storage path for cleanup
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
// Seed Database (from static products)
export const seedDatabase = async (initialProducts: any[]) => {
  try {
    const existing = await getProducts();
    // Allow seeding if database is empty or if user wants to re-sync
    // For simplicity, we'll just add new ones or skip if names match
    const existingNames = new Set(existing.map(p => p.name + p.description));

    let count = 0;
    for (const product of initialProducts) {
      if (existingNames.has(product.name + product.description)) continue;

      const { id, ...data } = product;
      
      let finalImageSrc = data.imageSrc;

      // Upload image to Cloudinary if it's a local path
      if (data.imageSrc.startsWith("/")) {
        try {
          const response = await fetch(data.imageSrc);
          const blob = await response.blob();
          // Convert blob to File object for the upload function if necessary, 
          // but FormData handles Blobs too.
          finalImageSrc = await uploadToCloudinary(blob as any);
        } catch (uploadError) {
          console.error(`Failed to upload image to Cloudinary for ${product.name}:`, uploadError);
          // Fallback to original path if upload fails
        }
      }

      await addProduct({
        ...data,
        imageSrc: finalImageSrc,
        price: typeof data.price === 'string' ? Number(data.price.replace(/[^0-9.-]+/g, "")) : data.price,
        inStock: true,
        isPromo: false,
        category: "Perfume",
        discoveryText: data.discoveryText || "A signature Mac Bancy fragrance."
      });
      count++;
    }
    
    return { 
      success: true, 
      message: count > 0 ? `Seeded ${count} new products with images.` : "No new products to seed." 
    };
  } catch (error) {
    console.error("Error seeding database: ", error);
    throw error;
  }
};
