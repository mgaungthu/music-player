export async function getTopTracks(artist: string) {
  try {
    console.log("🎵 Fetching artist:", artist);
    const res = await fetch(`http://localhost:3000/api/tracks?artist=${encodeURIComponent(artist)}`);
    console.log("🔗 Response status:", res.status);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    console.log("📦 Response data:", data);
    return data.track || [];
  } catch (error) {
    console.error("❌ Error fetching top tracks:", error);
    return [];
  }
}

export async function searchTrack(artist: string, track: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/tracks?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}`);
    const data = await res.json();
    return data.track?.[0] || null;
  } catch (error) {
    console.error("Error searching track:", error);
    return null;
  }
}

export async function getRandomArtistTopTracksOffline() {
  const ARTISTS = ["Coldplay", "Adele", "Ed Sheeran", "Imagine Dragons", "Bruno Mars"];

  for (let i = 0; i < ARTISTS.length; i++) {
    const randomArtist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];
    const tracks = await getTopTracks(randomArtist);
    if (tracks && tracks.length > 0) {
      console.log("✅ Using artist:", randomArtist);
      return tracks;
    }
  }

  console.warn("⚠️ No tracks found for any artist");
  return [];
}