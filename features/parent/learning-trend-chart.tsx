"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { week: "第1周", score: 68 },
  { week: "第2周", score: 71 },
  { week: "第3周", score: 76 },
  { week: "第4周", score: 79 }
];

export function LearningTrendChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3A7CA5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3A7CA5" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#dbe5ef" />
          <XAxis dataKey="week" stroke="#54606d" fontSize={12} />
          <YAxis stroke="#54606d" fontSize={12} domain={[60, 90]} />
          <Tooltip />
          <Area type="monotone" dataKey="score" stroke="#3A7CA5" fill="url(#scoreGradient)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
