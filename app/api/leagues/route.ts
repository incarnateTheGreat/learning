import { NextResponse } from "next/server";

export async function GET() {
  const res: Response = await fetch(
    `https://fantasy.premierleague.com/api/leagues-classic/16608/standings?page_standings=2`,
  );

  const resJson = await res.json();

  return NextResponse.json(resJson);
}
