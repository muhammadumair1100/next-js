import { auth } from "@/lib/Auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function signUp(email: string, password: string) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
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

export async function LogIn(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      throw new Error("Email or Password is incorrect.");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Invalid email format.");
    }
    console.error("Unhandled login error:", error.code);
    throw new Error("Something went wrong. Please try again.");
  }
}
