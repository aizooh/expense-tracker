import React, { useEffect, useState } from 'react';
import CustomPieChart from "../../components/Charts/CustomPieChart";
const COLORS = ['#875CF5', '#FA2c37', '#FF6900', '#4F39F6'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount, // Changed value -> amount
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg"> Last 60 days Income </h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`Ksh ${totalIncome}`}
        showTextAnchor
        colors={COLORS} // Fixed prop name
      />
    </div>
  );
};

export default RecentIncomeWithChart;