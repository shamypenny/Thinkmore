import type { UserRole } from "@/types";

export function getDashboardRoute(role: UserRole) {
  if (role === "student") return "/student";
  if (role === "parent") return "/parent";
  if (role === "teacher") return "/teacher";

  return "/";
}
