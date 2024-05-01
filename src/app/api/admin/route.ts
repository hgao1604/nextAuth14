import { isAuthorized } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const authorized = isAuthorized(["ADMIN"]);
  if (!authorized) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 200 });
}
