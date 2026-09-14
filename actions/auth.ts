import { auth } from "@/lib/Auth";
import { firestoreDB } from "@/lib/authDatabase";
import emailjs from "@emailjs/browser";
import { registerUser } from "./signUpDatabase";
import { SignupTypes } from "@/types/AuthTypes";
import { User } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export async function signUp(formData: SignupTypes): Promise<User | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );

    if (userCredential) {
      registerUser(userCredential?.user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      return userCredential.user;
    }
    return undefined;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email Already Exists Please Login");
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Please Make Strong The Password");
    }
    if (error.code === "auth/missing-password") {
      throw new Error("Please Type Password");
    }
  }
}

export async function logIn(
  email: string,
  password: string,
): Promise<User | undefined> {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      throw new Error("Email or Password is incorrect.");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email format.");
    }
    console.error("Unhandled login error:", error.code || error);
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function logOut() {
  const user = await signOut(auth);
}

export async function logedInUsers(
  userId: string | undefined,
): Promise<{ firstName: string; lastName: string } | undefined> {
  if (userId) {
    const userRef = doc(firestoreDB, "SignUpUsers", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as { firstName: string; lastName: string };
    } else {
      return undefined;
    }
  }
}
