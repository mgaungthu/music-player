import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";


export const metadata = {
  title: "Music Dashboard",
  description: "Get lost in your music",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white">
        <div className="flex min-h-screen">
          <PlayerProvider>
          {children}
          </PlayerProvider>
        </div>
      </body>
    </html>
  );
}