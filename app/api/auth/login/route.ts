import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;

  const redirectUri =
    "https://gandi-politics-verify.vercel.app/api/auth/callback";

  const url =
    `https://discord.com/oauth2/authorize` +
    `?client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=identify`;

  return NextResponse.redirect(url);
}