import { NextResponse } from "next/server";

import { getMockCorrectionResult } from "@/lib/services/correction-service";

export async function POST(request: Request) {
  const payload = (await request.json()) as { fileName?: string };
  const result = await getMockCorrectionResult(payload.fileName);

  return NextResponse.json(result);
}
