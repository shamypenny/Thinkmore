import { NextResponse } from "next/server";

import { getDashboardRoute } from "@/lib/utils/routes";
import type { UserRole } from "@/types";

export async function POST(request: Request) {
  const formData = await request.formData();
  const role = formData.get("role");

  if (role !== "student" && role !== "parent" && role !== "teacher") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.redirect(new URL(getDashboardRoute(role as UserRole), request.url));
  response.cookies.set("demo-role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  return response;
}
