import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ sales, loading, error }) => {
  const [chartData, setChartData] = useState(null);
  const [yMax, setYMax] = useState(null);

  useEffect(() => {
    if (!Array.isArray(sales) || sales.length === 0) {
      setChartData(null);
      setYMax(null);
      return;
    }

    const categoryMap = {};

    sales.forEach((item) => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = 0;
      }
      categoryMap[item.category] += item.amount;
    });

    const amounts = Object.values(categoryMap);
    const maxAmount = Math.max(...amounts, 0);

    // Add some headroom and round up to a "nice" value so the y-axis scale looks stable and professional
    const bufferedMax = maxAmount * 1.1 || 1;
    const magnitude = Math.pow(10, Math.floor(Math.log10(bufferedMax)));
    const niceMax = Math.ceil(bufferedMax / magnitude) * magnitude;

    setYMax(niceMax);

    setChartData({
      labels: Object.keys(categoryMap),
      datasets: [
        {
          label: "Sales",
          data: amounts,
          backgroundColor: "rgba(236, 72, 153, 0.7)",
          borderColor: "rgba(236, 72, 153, 1)",
          borderWidth: 1,
          borderRadius: 6,
          maxBarThickness: 60,
          barPercentage: 0.5,
          categoryPercentage: 0.6,
        },
      ],
    });
  }, [sales]);

  if (loading) return <p className="text-white text-center">Loading chart...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!chartData) return null;

  return (
    <div className="bg-zinc-900 p-5 rounded-xl shadow-lg h-[400px]">
      <h2 className="text-white text-lg font-semibold mb-4">
        Sales by Category
      </h2>

      <div className="h-[320px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: "#fff" } },
            },
            scales: {
              x: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
              y: {
                beginAtZero: true,
                suggestedMax: yMax || undefined,
                ticks: {
                  color: "#fff",
                  stepSize: yMax ? Math.max(Math.round(yMax / 5), 1) : undefined,
                },
                grid: { color: "rgba(255,255,255,0.1)" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChartComponent;