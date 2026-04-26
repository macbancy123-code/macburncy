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
  order?: number; // For manual arrangement
  ratingCount?: number;
  totalRatingScore?: number;
}

const PRODUCTS_COLLECTION = "products";

// Add a new product
export const addProduct = async (product: Omit<ProductData, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      ratingCount: product.ratingCount || 1,
      totalRatingScore: product.totalRatingScore || product.rating,
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
    // We fetch all products and sort them in JS to avoid excluding products
    // that don't have an 'order' field yet (Firestore filters them out if we orderBy)
    const q = query(collection(db, PRODUCTS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductData[];

    // Sort by order first, then fallback to createdAt
    products.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // Fallback to createdAt if order is the same or missing
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA;
    });

    return products;
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

// Update multiple product orders
export const updateProductsOrder = async (products: { id: string, order: number }[]) => {
  try {
    // We can't do a real batch easily with the current setup, but we can do parallel updates
    const promises = products.map(p => {
      const docRef = doc(db, PRODUCTS_COLLECTION, p.id);
      return updateDoc(docRef, { order: p.order });
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error updating products order: ", error);
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

// Rate a product (Updates average)
export const rateProduct = async (id: string, score: number) => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;

    const data = docSnap.data();
    const currentCount = data.ratingCount || 0;
    const currentTotal = data.totalRatingScore || (data.rating * (currentCount || 1));
    
    const newCount = currentCount + 1;
    const newTotal = currentTotal + score;
    const newRating = Number((newTotal / newCount).toFixed(1));

    await updateDoc(docRef, {
      ratingCount: newCount,
      totalRatingScore: newTotal,
      rating: newRating
    });
    
    return newRating;
  } catch (error) {
    console.error("Error rating product: ", error);
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
        discoveryText: data.discoveryText || "A signature Mac Bancy fragrance.",
        order: count + existing.length, // Set an initial order
        ratingCount: 1,
        totalRatingScore: data.rating || 5
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
