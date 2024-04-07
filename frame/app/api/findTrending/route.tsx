import { getTokens } from "@/app/utils/rollup";
import { kv } from "@vercel/kv";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const tokens = getTokens();
    console.log("Tokens", tokens);
    return NextResponse.json(tokens);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
