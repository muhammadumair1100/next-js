"use server";
import { db } from "@/lib/firebase";
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
} from "firebase/firestore";
import { UserTypes } from "@/types/createPostTypes";

export async function addData(formData: UserTypes): Promise<void> {
  if (formData.name && formData.age && formData.location) {
    const userCollection = collection(db, "User");
    await addDoc(userCollection, {
      name: formData.name.toLowerCase(),
      age: formData.age,
      location: formData.location.toLowerCase(),
    });
  }
}

export async function getData(): Promise<UserTypes[]> {
  const userCollection = collection(db, "User");
  const querySnapShot = await getDocs(userCollection);
  return querySnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as UserTypes),
  }));
}

export async function updateData(
  userId: string | undefined,
  updatedData: UserTypes,
): Promise<void> {
  if (userId) {
    if (updatedData.name && updatedData.age && updatedData.location) {
      const updatedUser = doc(db, "User", userId);
      await updateDoc(updatedUser, {
        name: updatedData.name.toLowerCase(),
        age: updatedData.age,
        location: updatedData.location.toLowerCase(),
      });
    }
  }
}

export async function DeleteData(userId: string | undefined): Promise<void> {
  if (userId) {
    const deletedUser = doc(db, "User", userId);
    await deleteDoc(deletedUser);
  }
}

export async function getUserDetails(
  userId: string,
): Promise<UserTypes | undefined> {
  const userRef = doc(db, "User", userId);
  const userSnapShot = await getDoc(userRef);

  if (userSnapShot.exists()) {
    return userSnapShot.data() as UserTypes;
  }
  return undefined;
}

export async function getByNameAge({
  name,
  age,
}: {
  name: string;
  age: string;
}): Promise<UserTypes[] | undefined> {
  if (name && age !== undefined) {
    const queries = query(
      collection(db, "User"),
      where("name", "==", name.toLowerCase()),
      where("age", ">=", age),
    );

    const userSnapShot = await getDocs(queries);
    return userSnapShot.docs.map((doc) => ({ ...doc.data() }) as UserTypes);
  }

  return undefined;
}
