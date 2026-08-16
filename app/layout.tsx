import "@/app/globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex  flex-col">
        <div className="w-screen text-center flex justify-center h-full border-white">
          {children}
        </div>
      </body>
    </html>
  );
}
