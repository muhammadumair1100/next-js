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
  setDoc,
  writeBatch,
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

// ================ User Added Products ==================
// 1. CREATE: Naya Product Add Karein
export async function addProducts(product: ProductsType, userId: string) {
  const timeID = String(Date.now());
  try {
    const productsRef = doc(firestoreDB, "Products", timeID);
    await setDoc(productsRef, {
      ...product,
      productID: userId,
      id: timeID,
      userQty: 1,
      sold: 0,
    });
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
export async function updateProduct(products: ProductsType[] | ProductsType) {
  const product = Array.isArray(products) ? products : [products];
  try {
    const batch = writeBatch(firestoreDB);
    product.forEach((p) => {
      batch.update(doc(firestoreDB, "Products", p.id!), {
        name: p.name,
        price: p.price,
        description: p.description,
        Qty: p.Qty,
        userQty: p.userQty,
        sold: p.sold,
      });
    });
    await batch.commit();
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

// 4. DELETE: Product Ko Delete Karein
export async function deleteProduct(productId: string) {
  try {
    const productRef = doc(firestoreDB, "Products", productId);
    await deleteDoc(productRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

// ================= User Cart Products =====================
// 1. Add In Cart
export async function addInCart(product: ProductsType[] | ProductsType) {
  const batch = writeBatch(firestoreDB);
  const products = Array.isArray(product) ? product : [product];

  try {
    products.forEach((p) => {
      batch.set(doc(firestoreDB, "Cart", p.id!), { ...p });
    });
    await batch.commit();
  } catch (error: any) {
    throw new Error("Product Was Not Added");
  }
}

// 2. Get From Cart
export async function getFromCart(userId: string): Promise<ProductsType[]> {
  const prodcutsRef = collection(firestoreDB, "Cart");
  const querySnapshot = query(prodcutsRef, where("productID", "==", userId));
  const data = await getDocs(querySnapshot);

  const productList: ProductsType[] = [];
  data.forEach((doc) => productList.push(doc.data() as ProductsType));
  return productList;
}

// 3. Delete From Cart
export async function deleteFromCart(id: string) {
  try {
    const productRef = doc(firestoreDB, "Cart", id);
    await deleteDoc(productRef);
  } catch (error: any) {
    throw new Error("Product Was Not Deleted");
  }
}
