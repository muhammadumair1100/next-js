import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <div className="flex mx-auto w-2/4 items-center py-5 justify-between">
          <h1 className="text-2xl text-gray-400 font-bold">FireBase</h1>
          <div className="flex items-center gap-3">
            <Link
              href={"create-post"}
              className="bg-emerald-400 cursor-pointer text-white px-4 py-2 rounded-md font-md text-base"
            >
              Create Post
            </Link>
            <Link
              href={"watch-post"}
              className="bg-neutral-600 cursor-pointer text-white px-4 py-2 rounded-md font-md text-base"
            >
              See Post
            </Link>
          </div>
        </div>
        <div className="text-center flex justify-center h-full border-white">
          {children}
        </div>
      </body>
    </html>
  );
}
