"use client";
import { useState } from "react";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export default function Home() {
  const [signUpLogIn, setSignUpLogIn] = useState("SIGNUP");
  return (
    // This section is for firestore and realtime databases
    // <div className="text-lg mt-10 w-5/12 h-80 flex  flex-col items-center rounded-md justify-center font-medium bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
    //   <h1 className="text-gray-500">
    //     Want To Create Post?{" "}
    //     <span className="uppercase text-black">Click Post Button!</span>
    //   </h1>
    //   <h1 className="text-gray-500">
    //     Want To Watch Post?{" "}
    //     <span className="uppercase text-black">Click Watch Button!</span>
    //   </h1>
    // </div>

    // This section is for Authentication
    <>
      {signUpLogIn === "SIGNUP" ? (
        <SignupForm loginValue={signUpLogIn} login={setSignUpLogIn} />
      ) : (
        <LoginForm signupValue={signUpLogIn} signup={setSignUpLogIn} />
      )}
    </>
  );
}
