import Sidebar from "@/components/Sidebar";
import MusicCard from "@/components/MusicCard";
import PlayerBar from "@/components/PlayerBar";
import { Heart } from "lucide-react";

import {
  getTopTracks,
} from "@/lib/theAudioDb";
import RecommendedTracks from "@/components/RecommendedTracks";
import RecentlyPlayed from "@/components/RecentlyPlayed";

export default async function Page() {
  // Fetch top tracks for a specific artist

  const tracks = await getTopTracks('adele');

 

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <MusicCard
            title="GET LOST"
            subtitle="in your music."
            color="linear-gradient(135deg,#F72585,#7209B7)"
          />
          <MusicCard
            title="MELLOW"
            subtitle="beats."
            color="linear-gradient(135deg,#4361EE,#4895EF)"
          />
        </div>

        <section className="grid grid-cols-2 gap-6">
          <div>
            <RecentlyPlayed tracks={tracks} />
          </div>

          {/* You can reuse this for “Recommended” section */}
          <div>
            <h3 className="font-semibold mb-3 text-black">
              Recommended For You
            </h3>
            <RecommendedTracks tracks={tracks} />
            
          </div>
        </section>
      </main>

      <PlayerBar />
    </>
  );
}
