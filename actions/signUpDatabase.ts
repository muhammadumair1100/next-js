import {
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { SignupTypes } from "@/types/AuthTypes";
import { firestoreDB } from "@/lib/authDatabase";
import { UserActivity } from "@/types/Activity";

export async function registerUser(
  uid: string | undefined,
  userData: { firstName: string; lastName: string },
) {
  if (uid) {
    const userDoc = doc(firestoreDB, "SignUpUsers", uid);
    await setDoc(userDoc, userData);
  }
}

export async function getUser(
  userID: string,
): Promise<{ firstName: string; lastName: string } | undefined> {
  if (userID) {
    const userRef = doc(firestoreDB, "SignUpUsers", userID);
    const snapUser = await getDoc(userRef);

    if (snapUser.exists()) {
      return snapUser.data() as { firstName: string; lastName: string };
    }

    return undefined;
  }
}

export async function userActivity(activities: UserActivity) {
  await addDoc(collection(firestoreDB, "Activities"), activities);
}

export async function getActivity(): Promise<UserActivity[] | undefined> {
  const activity = await getDocs(collection(firestoreDB, "Activities"));

  if (activity) {
    return activity.docs.map((doc) => ({ ...(doc.data() as UserActivity) }));
  }
  return undefined;
}
