import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "World Ranks",
  description: "A web app that lists countries and their rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={beVietnamPro.className}>
        <Toaster position="top-right"/>
        {children}
        <footer className="flex justify-center">
    <a target="_blank" href="https://icons8.com/icon/fwZqiZ96Ihs_/america">America</a> icon by <a target="_blank" href="https://icons8.com" className="text-center">Icons8</a>
    </footer>
      </body>
    </html>
  );
}
