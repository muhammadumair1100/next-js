import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestoreDB } from "@/lib/authDatabase";
import { ProductsType } from "@/types/ProductsTypes";

export async function addProducts(data: ProductsType, userId: string) {
  if (!userId) return;
  const userCollection = collection(firestoreDB, "Products");
  await addDoc(userCollection, { ...data, productID: userId });
}

export async function getProducts(
  userId: string,
): Promise<ProductsType[] | undefined> {
  if (!userId) return undefined;

  const userCollection = collection(firestoreDB, "Products");
  const userQuery = query(userCollection, where("productID", "==", userId));
  const querySnapshot = await getDocs(userQuery);

  const productsData = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ProductsType;
  });

  return productsData;
}
