import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import CustomToolTip from "./CustomToolTip";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = ["000"], // default color if not provided
  showTextAnchor,
}) => {
  // Always use fallback arrays to prevent runtime errors
  const safeData = Array.isArray(data) ? data : [];
  const safeColors = Array.isArray(colors) && colors.length > 0 ? colors : ["000"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={safeData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {safeData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`${safeColors[index % safeColors.length]}`}
            />
          ))}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize={14}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize={24}
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;