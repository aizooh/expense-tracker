import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const DEFAULT_COLORS = ['0088FE', '00C49F', 'FFBB28', 'FF8042', 'AF19FF', 'FF0050'];

const CustomPieChart = ({
  data = [],               // fallback to empty array
  label = "",
  totalAmount = "",
  colors = DEFAULT_COLORS, // fallback to default colors
  showTextAnchor = true,
}) => {
    console.log("PieChart Data (inside component):", data);
  console.log("Colors array (inside component):", colors);
  console.log("Colors array length:", colors.length);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {Array.isArray(data) &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
        </Pie>

        <Tooltip content={CustomToolTip} />
        <Legend content={CustomLegend} />

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
