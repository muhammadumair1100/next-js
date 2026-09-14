import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { firestoreDB } from "@/lib/authDatabase";
import { ProductsType } from "@/types/ProductsTypes";

// export async function addProducts(data: ProductsType, userId: string) {
//   if (!userId) return;
//   const userCollection = collection(firestoreDB, "Products");
//   await addDoc(userCollection, { ...data, productID: userId });
// }

// export async function getProducts(
//   userId: string,
// ): Promise<ProductsType[] | undefined> {
//   if (!userId) return undefined;

//   const userCollection = collection(firestoreDB, "Products");
//   const userQuery = query(userCollection, where("productID", "==", userId));
//   const querySnapshot = await getDocs(userQuery);

//   const productsData = querySnapshot.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//     } as ProductsType;
//   });

//   return productsData;
// }
// Type define karein (Ya apne types folder se import karein)
export interface ProductData {
  id?: string;
  name: string;
  price: string | number;
  description: string;
  createdAt?: any;
}

// 1. CREATE: Naya Product Add Karein
export async function addProducts(product: ProductsType, userId: string) {
  try {
    const productsRef = collection(firestoreDB, "Products");
    const docRef = await addDoc(productsRef, {
      ...product,
      productID: userId,
      id: Date.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
}

// 2. READ: User ke Sabhi Products Layein
export async function getProducts(userId: string): Promise<ProductsType[]> {
  try {
    const productsRef = collection(firestoreDB, "Products");

    // Query lagayein taake sirf usi user ke products milein
    const q = query(productsRef, where("productID", "==", userId));
    const querySnapshot = await getDocs(q);

    const productsList: ProductsType[] = [];

    querySnapshot.forEach((doc) => {
      productsList.push({
        id: doc.id,
        ...doc.data(),
      } as ProductsType);
    });

    return productsList;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// 3. UPDATE: Existing Product Ko Edit Karein
export async function updateProduct(product: ProductsType, editID: string) {
  try {
    if (editID) {
      const productRef = doc(firestoreDB, "Products", editID);

      // Sirf wo fields update karein jo bheji gayi hain
      await updateDoc(productRef, {
        name: product.name,
        price: product.price,
        description: product.description,
        updatedAt: Timestamp.now(),
      });

      return { success: true };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

// 4. DELETE: Product Ko Delete Karein
export async function deleteProduct(productId: string) {
  try {
    const productRef = doc(firestoreDB, "products", productId);
    await deleteDoc(productRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
