import "@/app/globals.css";
import Link from "next/link";
import { AuthProvider } from "@/contextAPI/AuthContext";
import { ActivityProvider } from "@/contextAPI/ActivityContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* This is firestore and realtime databases section  */}
        {/* <div className="flex mx-auto w-2/4 items-center py-5 justify-between">
          <Link href={"/"} className="text-2xl text-gray-400 font-bold">
            FireBase
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={"/create-post"}
              className="bg-emerald-400 cursor-pointer text-white px-4 py-2 font-mono rounded-md font-medium text-sm"
            >
              Create Post
            </Link>
            <Link
              href={"/watch-post"}
              className="bg-neutral-600 cursor-pointer text-white px-4 py-2 font-mono rounded-md font-medium text-sm"
            >
              Watch Post
            </Link>
            <Link
              href={"/filter"}
              className="bg-stone-200 px-4 py-2 rounded-md font-mono font-medium text-sm"
            >
              Filter By Name & Age
            </Link>
          </div>
        </div> */}
        <AuthProvider>
          <ActivityProvider>
            <div className="w-screen h-screen">{children}</div>
          </ActivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
