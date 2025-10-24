import { NextResponse } from "next/server";

const API_KEY = "2"; // public test key
const BASE_URL = `https://theaudiodb.com/api/v1/json/${API_KEY}`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artist = searchParams.get("artist");

  if (!artist) {
    return NextResponse.json(
      { error: "Missing 'artist' query parameter" },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `${BASE_URL}/track-top10.php?s=${encodeURIComponent(artist)}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from TheAudioDB" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from TheAudioDB:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}