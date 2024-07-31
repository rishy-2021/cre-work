import LeftSideBar from "@/components/ui/dashboard/left-side-bar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} flex flex-col flex-1 min-h-screen`}>
        <main
          className="flex-1 flex min-w-screen"
        >
            <LeftSideBar />
          {children}
        </main>
      </body>
    </html>
  );
}
