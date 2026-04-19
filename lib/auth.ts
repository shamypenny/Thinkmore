import { cookies } from "next/headers";

import { demoUsers } from "@/lib/mock-data/demo";
import type { DemoUser, UserRole } from "@/types";

export async function getDemoSession(): Promise<DemoUser | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get("demo-role")?.value as UserRole | undefined;

  if (!role) {
    return null;
  }

  return demoUsers.find((user) => user.role === role) ?? null;
}

export function getDemoUserByRole(role: UserRole) {
  return demoUsers.find((user) => user.role === role) ?? null;
}
