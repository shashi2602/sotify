import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { nextOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(nextOptions);
  return NextResponse.json({ message: "success", session: session });
}
