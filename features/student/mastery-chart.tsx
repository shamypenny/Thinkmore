"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { KnowledgePointSummary } from "@/types";

export function MasteryChart({ items }: { items: KnowledgePointSummary[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={items}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dbe5ef" />
          <XAxis dataKey="name" stroke="#54606d" fontSize={12} />
          <YAxis stroke="#54606d" fontSize={12} domain={[0, 100]} />
          <Tooltip cursor={{ fill: "rgba(58,124,165,0.08)" }} />
          <Bar dataKey="mastery" fill="#3A7CA5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
