import { setDoc, doc } from "firebase/firestore";
import { SignupTypes } from "@/types/AuthTypes";
import { firestoreDB } from "@/lib/authDatabase";

export async function registerUser(
  uid: string | undefined,
  userData: { firstName: string; lastName: string },
) {
  if (uid) {
    const userDoc = doc(firestoreDB, "SignUpUsers", uid);
    await setDoc(userDoc, userData);
  }
}
