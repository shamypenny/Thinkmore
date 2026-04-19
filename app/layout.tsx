import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "智学导航",
  description: "引导学生思考、辅助家长辅导、赋能教师洞察的教育 AI MVP"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
