import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import SotifyContext from "@/context/SotifyContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "sotify",
  description: "liked a song on instagram simply share link and and that song to your spotify playlist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SotifyContext>{children}</SotifyContext>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
