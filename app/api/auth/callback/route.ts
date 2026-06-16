import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      "https://discord.com/channels/1516156573620240614/1516223995010355360"
    );
  }

  try {
    // Exchange code for token
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
      redirect_uri:
        "https://gandi-politics-verify.vercel.app/api/auth/callback",
    });

    const tokenRes = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const tokenData = await tokenRes.json();

    // Get Discord user
    const userRes = await fetch(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const user = await userRes.json();

    // Add user to server
const joinRes = await fetch(
  `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: tokenData.access_token,
    }),
  }
);

const joinData = await joinRes.text();

    // Add role
    const roleRes = await fetch(
       `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.id}/roles/${process.env.DISCORD_ROLE_ID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    const roleData = await roleRes.text();

    return NextResponse.redirect(
     "https://gandi-politics-verify.vercel.app"
     );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}