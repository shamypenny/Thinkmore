import { NextResponse } from "next/server";

import { buildGuidedReply } from "@/lib/services/guide-service";
import type { GuidedMessage } from "@/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    message: string;
    history: GuidedMessage[];
    gradeLabel?: string;
  };

  const reply = await buildGuidedReply(payload);
  return NextResponse.json(reply);
}