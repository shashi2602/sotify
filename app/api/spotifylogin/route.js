import { NextResponse } from "next/server";

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "6000f0767dc64b39a97d5be21ea4467b";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-read-private"
];

export async function GET() {
  return NextResponse.json({ message: "success" });
}