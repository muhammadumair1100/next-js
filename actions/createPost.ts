import { firestoreDB, realTimeDB } from "@/lib/databaseFirebase";
import { UserTypes } from "@/types/createPostTypes";

// Firebase Firestore Database All Imports
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

// Firebase Realtime Database All Imports
import { ref, set, push, get, update, remove } from "firebase/database";

// ===================== FIREBASE FIRESTORE DATABASE ========================

// Using Firebase Firestore To Add
// export async function addData(formData: UserTypes): Promise<void> {
//   if (formData.name && formData.age && formData.location) {
//     const userCollection = collection(db, "User");
//     await addDoc(userCollection, {
//       name: formData.name.toLowerCase(),
//       age: formData.age,
//       location: formData.location.toLowerCase(),
//     });
//   }
// }
// Using Firebase Firestore To Get
// export async function getData(): Promise<UserTypes[]> {
//   const userCollection = collection(firestoreDB, "User");
//   const querySnapShot = await getDocs(userCollection);
//   return querySnapShot.docs.map((doc) => ({
//     id: doc.id,
//     ...(doc.data() as UserTypes),
//   }));
// }
// Using Firebase Firestore To Update
// export async function updateData(
//   userId: string | undefined,
//   updatedData: UserTypes,
// ): Promise<void> {
//   if (userId) {
//     if (updatedData.name && updatedData.age && updatedData.location) {
//       const updatedUser = doc(firestoreDB, "User", userId);
//       await updateDoc(updatedUser, {
//         name: updatedData.name.toLowerCase(),
//         age: updatedData.age,
//         location: updatedData.location.toLowerCase(),
//       });
//     }
//   }
// }
// Using Firebase Firestore To Delete
// export async function deleteData(userId: string | undefined): Promise<void> {
//   if (userId) {
//     const deletedUser = doc(firestoreDB, "User", userId);
//     await deleteDoc(deletedUser);
//   }
// }
// Using Firebase Firestore To Get Single Data By Id
// export async function getUserDetails(
//   userId: string,
// ): Promise<UserTypes | undefined> {
//   const userRef = doc(firestoreDB, "User", userId);
//   const userSnapShot = await getDoc(userRef);

//   if (userSnapShot.exists()) {
//     return userSnapShot.data() as UserTypes;
//   }
//   return undefined;
// }
// Using Firebase Firestore To Get Multiple Same Data By Name And Age
export async function getByNameAge({
  name,
  age,
}: {
  name: string;
  age: string;
}): Promise<UserTypes[] | undefined> {
  if (name && age !== undefined) {
    const queries = query(
      collection(firestoreDB, "User"),
      where("name", "==", name.toLowerCase()),
      where("age", ">=", age),
    );

    const userSnapShot = await getDocs(queries);
    return userSnapShot.docs.map((doc) => ({ ...doc.data() }) as UserTypes);
  }

  return undefined;
}

// ====================== FIREBASE REALTIME DATABASE =========================

//Using Firebase Realtime Database To Add
export async function addData(formData: UserTypes) {
  const userRef = ref(realTimeDB, "Users");
  const pushUser = push(userRef);
  await set(pushUser, formData);
}

// Using Firebase Realtime Database To Get Data
// export async function getData() {
//   const userRef = ref(realTimeDB, "Users");
//   const snapshot = await get(userRef);

//   if (snapshot.exists()) {
//     const rawData = snapshot.val();
//     const dataArray = Object.entries(rawData).map(([key, value]) => ({
//       id: key,
//       ...(value as UserTypes),
//     }));

//     return dataArray;
//   }

//   return [];
// }

// Using Firebase Realtime Database To Update Data
export async function updateData(
  userId: string | undefined,
  formData: UserTypes,
) {
  if (userId) {
    const userRef = ref(realTimeDB, `Users/${userId}`);
    await update(userRef, formData);
  }
}

// Using Firebase Realtime Database To Delete Data
export async function deleteData(userId: string | undefined) {
  if (userId) {
    const userRef = ref(realTimeDB, `Users/${userId}`);
    await remove(userRef);
  }
}

// Using Firebase Realtime Database To Get Single Data By Id
// export async function getUserDetails(
//   userId: string,
// ): Promise<UserTypes | undefined> {
//   const userRef = ref(realTimeDB, `Users/${userId}`);
//   const snapshot = await get(userRef);

//   if (snapshot.exists()) {
//     return snapshot.val() as UserTypes;
//   }
//   return undefined;
// }
