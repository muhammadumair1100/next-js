"use client";

import "@/app/globals.css";
import { AuthProvider, useAuth } from "@/contextAPI/AuthContext";
import { ActivityProvider } from "@/contextAPI/ActivityContent";
import Sidebar from "./watch-post/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ActivityProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <Sidebar />
              <main className="flex-1 h-screen overflow-y-auto">
                {children}
              </main>
            </div>
          </ActivityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
