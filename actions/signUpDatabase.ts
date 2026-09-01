import { setDoc, doc } from "firebase/firestore";
import { SignUpTypes } from "@/types/AuthTypes";
import { firestoreDB } from "@/lib/authDatabase";
export async function registerUser(
  uid: string | undefined,
  userData: { firstName: string; lastName: string; phoneNumber: string },
) {
  if (uid) {
    const userDoc = doc(firestoreDB, "SignUpUsers", uid);
    await setDoc(userDoc, userData);
  }
}
