"use server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { UserTypes } from "@/types/createPostTypes";

export async function addData(formData: UserTypes) {
  if (formData.name && formData.age && formData.location) {
    const userCollection = collection(db, "User");
    await addDoc(userCollection, formData);
  }
}

export async function getData(): Promise<UserTypes[]> {
  const userCollection = collection(db, "User");
  const querySnapShot = await getDocs(userCollection);
  return querySnapShot.docs.map((doc) => ({
    name: doc.data().name,
    age: doc.data().age,
    location: doc.data().location,
    id: doc.id,
  }));
}

export async function updateData(
  userId: string | undefined,
  updatedData: UserTypes,
) {
  if (userId) {
    if (updatedData.name && updatedData.age && updatedData.location) {
      const updatedUser = doc(db, "User", userId);
      await updateDoc(updatedUser, updatedData);
    }
  }
}

export async function DeleteData(userId: string | undefined) {
  if (userId) {
    const deletedUser = doc(db, "User", userId);
    await deleteDoc(deletedUser);
  }
}
