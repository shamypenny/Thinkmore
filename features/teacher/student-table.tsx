"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const momentumMap = {
  up: "上升",
  steady: "平稳",
  down: "下滑"
};

export function StudentTable({
  rows
}: {
  rows: { id: string; name: string; assignmentCompletion: number; weakestPoint: string; momentum: "up" | "steady" | "down" }[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100">
      <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">学生</th>
            <th className="px-4 py-3 font-medium">作业完成率</th>
            <th className="px-4 py-3 font-medium">薄弱点</th>
            <th className="px-4 py-3 font-medium">走势</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 font-medium text-ink">{row.name}</td>
              <td className="px-4 py-3 text-slate-700">{row.assignmentCompletion}%</td>
              <td className="px-4 py-3 text-slate-700">{row.weakestPoint}</td>
              <td className="px-4 py-3 text-slate-700">{momentumMap[row.momentum]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ClassOverviewChart({
  rows
}: {
  rows: { name: string; assignmentCompletion: number }[];
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dbe5ef" />
          <XAxis dataKey="name" stroke="#54606d" fontSize={12} />
          <YAxis stroke="#54606d" fontSize={12} domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="assignmentCompletion" fill="#3A7CA5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
