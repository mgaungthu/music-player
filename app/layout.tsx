import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";


export const metadata = {
  title: "Music Dashboard",
  description: "Get lost in your music",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-linear-to-r from-pink-700 to-pink-600">
        
          <PlayerProvider>
          {children}
          </PlayerProvider>
        
      </body>
    </html>
  );
}